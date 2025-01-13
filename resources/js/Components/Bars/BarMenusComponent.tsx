import React, {useState} from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import axios from "axios";
import { Menus } from "@/types/bar";


interface BarMenusComponentProps{
    id: number,
    menus: Menus[],
    fetchBar: () => void;
}

interface menuList{
    id: number;
    menu:string;
    price:number
}

const BarMenusComponent:React.FC<BarMenusComponentProps> = ({
    id,
    menus,
    fetchBar
}) => {
    const [title, setTitle] = useState('');
    const [menu, setMenu] = useState<menuList[]>([]);
    const [newMenu, setNewMenu] = useState<string>("");
    const [newPrice, setNewPrice] = useState<number>(0);

    const addMenu = () => {
        if(newMenu.trim() === "" || newPrice === 0) return;

        const newTask: menuList = {
            id: Date.now(),
            menu: newMenu,
            price: newPrice
        };

        setMenu([...menu, newTask]);
        setNewMenu("");
        setNewPrice(0);
    }

    const deleteMenu = (id:number) => {
        setMenu(menu.filter((m) => m.id !== id));
    }

    const submitData = async() => {
        const formData = {
            bar_id: id,
            title: title,
            menus: JSON.stringify(menu)
        }

        await axios.post('/api/menus', formData)
                    .then(res => {
                        fetchBar();
                        setMenu([]);
                    })
    }


    return (
        <div>
            <div className="px-4 py-2 ">
                <h3 className="text-lg font-bold ">Create Menus</h3>
                <div className="px-4 py-3 mb-5 rounded-lg bg-gray-50">
                     <div className="">
                                                <InputLabel value="Menu Title" className="mb-2 text-lg"/>
                                                    <TextInput 
                                                        type="text" 
                                                        id="name"
                                                        name="name"
                                                        value={title}
                                                        className="block w-full mt-1 "
                                                        autoComplete="name"
                                                        onChange={(e) => setTitle(e.target.value)} 
                                                />
                     </div>
                     <div className="grid grid-cols-5 gap-4 px-2 py-3 mt-5 bg-white">
                        <div className="col-span-2 ">
                        <InputLabel value="Name" className="mb-2 text-lg"/>
                        <TextInput 
                                                        type="text" 
                                                        id="menu"
                                                        name="menu"
                                                        value={newMenu}
                                                        className="w-full mt-1"
                                                        autoComplete="name"
                                                        onChange={(e) => setNewMenu(e.target.value)} 
                                                />
                        </div>
                        <div className="col-span-2 ">
                        <InputLabel value="Price" className="mb-2 text-lg"/>
                        <TextInput 
                                                        type="text" 
                                                        id="price"
                                                        name="price"
                                                        value={newPrice}
                                                        className="w-full mt-1"
                                                        autoComplete="price"
                                                        onChange={(e) => setNewPrice(Number(e.target.value))} 
                                                />
                        </div>

                        <div className="col-span-1 ">
                        <button
                            onClick={addMenu}
                            className="px-4 py-2 mt-8 text-white rounded-full bg-cyan-900 hover:bg-cyan-800"
                            >
                            +
                            </button>
                        </div>
                      
                   
                     </div>
                     <div>
                        <ul className="list-disc spcae-y-4">
                            {
                                menu.map((m) => (
                                    <li
                                        key={m.id}
                                        className="grid grid-cols-5 py-2 ml-10">
                                        <span className="col-span-2 ">{m.menu}</span>
                                        <span className="col-span-2 ">{m.price}</span>
                                        <span className="col-span-1 ">
                                            <button onClick={() =>deleteMenu(m.id)} className="px-3 py-1 text-sm text-white rounded-lg bg-red-950">Delete</button>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                     </div>
                     <div className="flex justify-end mt-5">
                     <button onClick={submitData} className="px-3 py-2 text-white rounded-lg bg-cyan-900">
                        Submit
                     </button>
                     </div>
                    
                </div>
            </div>

            <div>
                {
                    menus.map((menu) => (
                        <div className="px-4 py-2 mx-4 my-2 bg-gray-100 rounded-lg ">
                            <p className="font-bold "> {menu.title} </p>
                            <ul className="list-disc spcae-y-4">
                                {JSON.parse(menu.menus).map((m:any) => (
                                    <li className="grid grid-cols-5 py-2 ml-10">
                                    <span className="col-span-3 ">{m.menu}</span>
                                    <span className="col-span-2 ">{m.price}</span>
                                    </li>
                                ))}
                            </ul>
                           
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BarMenusComponent;