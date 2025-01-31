import React, {Fragment, useState} from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import axios from "axios";
import { Menus } from "@/types/bar";
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Dialog, Transition } from "@headlessui/react";


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
    const [menuId, setID] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (data: Menus) => {
        
        const menu = JSON.parse(data.menus)
            setTitle(data.title);
            setMenu(menu);
            setID(data.id);
            //setIcon(data.icon);
            setIsOpen(true);
        }

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

    const updateData = async() => {
        const formData = {
            bar_id: id,
            title: title,
            menus: JSON.stringify(menu)
        }

        await axios.put(`/api/menus/${menuId}`, formData)
                   .then(res => {
                    fetchBar();
                    setMenu([]);
                    setTitle('');
                    setIsOpen(false);
                   })
    }

    const deleteData = async (id: number) => {
        await axios.delete(`/api/menus/${id}`)
                    .then(() => {
                        fetchBar();
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
                            <div className="flex justify-between ">
                            <p className="font-bold "> {menu.title} </p>
                            <span className="flex space-x-3">
                                        <IconEdit size={24} color="green" onClick={() => handleOpen(menu)}/>
                                        <IconTrash size={24} color="red" onClick={() => deleteData(menu.id)}/>
                                    </span>
                            </div>
                           
                            <ul className="list-disc spcae-y-4">
                                {JSON.parse(menu.menus).map((m:any) => (
                                    <li className="grid grid-cols-6 py-2 ml-10">
                                    <span className="col-span-3 ">{m.menu}</span>
                                    <span className="col-span-2 ">{m.price}</span>
                                    
                                    
                                    </li>
                                ))}
                            </ul>
                           
                        </div>
                    ))
                }
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-7/12 p-6 bg-white rounded-lg shadow-xl ">
                                <Dialog.Title className="text-lg font-semibold">
                                    Edit Menu
                                </Dialog.Title>
                                <div className="grid grid-cols-2 gap-4 mx-8">
                <div className="col-span-2 ">
                                            <InputLabel value="Title" className="mb-2 text-lg"/>
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
                <div className="col-span-2 ">
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
                    </div>
                
                <div className="flex justify-end col-span-2 pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => updateData() }>Update Category</button>
                        </div>
                        </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default BarMenusComponent;