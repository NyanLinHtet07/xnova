import React, {useState} from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import axios from "axios";


interface BarMenusComponentProps{
    id: number
}

interface menuList{
    id: number;
    menu:string;
    price:number
}

const BarMenusComponent:React.FC<BarMenusComponentProps> = ({
    id
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
                        console.log("Success")
                    })
    }

    return (
        <div>
            <div className="px-4 py-2 ">
                <h3 className="text-lg font-bold ">Create Menus</h3>
                <div className="grid grid-cols-1 ">
                     <div className="col-span-1 ">
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
                     <div className="flex col-span-1 mb-4 ">
                        <div>
                        <InputLabel value="Name" className="mb-2 text-lg"/>
                        <TextInput 
                                                        type="text" 
                                                        id="menu"
                                                        name="menu"
                                                        value={newMenu}
                                                        className="block w-full mt-1 "
                                                        autoComplete="name"
                                                        onChange={(e) => setNewMenu(e.target.value)} 
                                                />
                        </div>
                        <div>
                        <InputLabel value="Price" className="mb-2 text-lg"/>
                        <TextInput 
                                                        type="text" 
                                                        id="price"
                                                        name="price"
                                                        value={newPrice}
                                                        className="block w-full mt-1 "
                                                        autoComplete="price"
                                                        onChange={(e) => setNewPrice(Number(e.target.value))} 
                                                />
                        </div>

                        <button
                            onClick={addMenu}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                            Add
                            </button>
                   
                     </div>
                     <div>
                        <ul className=" spcae-y-4">
                            {
                                menu.map((m) => (
                                    <li
                                        key={m.id}>
                                        <span>{m.menu}</span>
                                        <span>{m.price}</span>
                                        <span>
                                            <button onClick={() =>deleteMenu(m.id)}>Delete</button>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                     </div>
                     <button onClick={submitData}>
                        Submit
                     </button>
                </div>
            </div>
        </div>
    )
}

export default BarMenusComponent;