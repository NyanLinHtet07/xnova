import React, {Fragment, useEffect, useState} from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import axios from "axios";
import { MenuItems, Menus } from "@/types/bar";
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Dialog, Transition } from "@headlessui/react";


interface BarMenusComponentProps{
    id: number,
}



const BarMenusNewComponent:React.FC<BarMenusComponentProps> = ({
    id
}) => {
    const [title, setTitle] = useState('');
    const [menuId, setID] = useState<number | null>(null);
    const [menuItemId, setItemID] = useState<number | null>(null);
    const [menuList, setMenuList] = useState<Menus[]>([]);
    const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
    const [menuItemName, setMenuItemName] = useState('');
    const [menuItemPrice, setMenuItemPrice] = useState('');
    const [menuItemImage, setMenuItemImage] = useState<File | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isItemOpen, setIsItemOpen] = useState(false);

    const handleOpen = (data: Menus) => {
        
        const menu = JSON.parse(data.menus)
            setTitle(data.title);

            setID(data.id);
            //setIcon(data.icon);
            setIsOpen(true);
        }

    const handleListOpen = (data: MenuItems) => {
        setMenuItemName(data.name);
        setMenuItemPrice(data.price.toString());
        setItemID(data.id);

        setIsItemOpen(true)
    }

   const fetchMenus = async() => {
    try {
        await axios.get(`/api/bar/menu/by-bar/${id}`)
                    .then(res => {
                        setMenuList(res.data);
                    })

    }

    catch(e){
        console.log("error is", e)
    }
   }
    
    const submitData = async() => {
        const formData = {
            bar_id: id,
            title: title,
        }

        await axios.post('/api/menus', formData)
                    .then(res => {
                        setTitle('');
                        fetchMenus();

                    })
    }

    const submitMenuItem = async (menuId:number) => {
        if(!menuItemName || !menuItemPrice ){
            alert("Please enter item name, price")
            return;
        }

        const formData = new FormData();
        formData.append('menu_id', menuId.toString());
        formData.append('name', menuItemName);
        formData.append('price', menuItemPrice);
        if (menuItemImage) {
            formData.append('image', menuItemImage);
        }

        try {
            await axios.post('/api/bar/menu/items', formData, {
                headers: {"Content-Type": "multipart/fprm-data"}
            });

            setMenuItemName('');
            setMenuItemPrice('');
            setMenuItemImage(null);
            // setVisibleMenuId(null);
            fetchMenus();
        }
        catch (error) {
            console.error("Error adding menu item", error);
          }
    }

    const updateItem = async () => {
        // if(!menuItemName || !menuItemPrice ){
        //     alert("Please enter item name, price")
        //     return;
        // }

        const formData = new FormData();
        //formData.append('menu_id', menuId.toString());
        formData.append('name', menuItemName);
        formData.append('price', menuItemPrice);
        if (menuItemImage) {
            formData.append('image', menuItemImage);
        }

        formData.append('_method', 'PUT');

        try {
            await axios.post(`/api/bar/menu/items/${menuItemId}`, formData, {
                headers: {"Content-Type": "multipart/fprm-data"}
            });

            setMenuItemName('');
            setMenuItemPrice('');
            setMenuItemImage(null);
            setVisibleMenuId(null);
            fetchMenus();
            setIsItemOpen(false)
        }
        catch (error) {
            console.error("Error adding menu item", error);
          }
    }

    const updateData = async() => {
        const formData = {
            bar_id: id,
            title: title,

        }

        await axios.put(`/api/menus/${menuId}`, formData)
                   .then(res => {
                    fetchMenus();

                    setTitle('');
                    setIsOpen(false);
                   })
    }

    const deleteData = async (id: number) => {
        await axios.delete(`/api/menus/${id}`)
                    .then(() => {
                        fetchMenus();
                    })
    }

    useEffect(() => {
        fetchMenus();
    }, [])


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
                   
                    
                     <div className="flex justify-end mt-5">
                     <button onClick={submitData} className="px-3 py-2 text-white rounded-lg bg-cyan-900">
                        Create
                     </button>
                     </div>
                    
                </div>
            </div>

            <div>
                {
                    menuList.map((menu) => (
                        <div className="px-4 py-2 mx-4 my-2 bg-gray-100 rounded-lg ">
                            <div className="flex justify-between ">
                            <p className="font-bold "> {menu.title} </p>
                                <span className="flex space-x-3">
                                {
                                    visibleMenuId === menu.id && (
                                        // <IconEdit size={24} color="green" onClick={() => handleOpen(menu)}/>
                                        <button onClick={() => handleOpen(menu)} 
                                            className="px-3 py-2 text-xs text-white rounded-lg bg-slate-800">
                                            Update Title
                                        </button>
                                    )
                                }
                                       
                                        <button onClick={() => setVisibleMenuId(visibleMenuId === menu.id ? null : menu.id)} 
                                            className="px-3 py-2 text-xs text-white rounded-lg bg-cyan-800">
                                                Menu List
                                        </button>
                                    </span>
                            </div>
                            {
                                visibleMenuId === menu.id && (
                                    <>
                                    <div className="flex justify-between p-3 mt-2 bg-white border rounded-lg">
                                        <div>
                                            <InputLabel value="Item Name" />
                                            <TextInput 
                                            type="text" 
                                            value={menuItemName} 
                                            onChange={(e) => setMenuItemName(e.target.value)} 
                                            className="block w-full mt-1"
                                            />
                                        </div>

                                        <div>
                                        <InputLabel value="Price" />
                                        <TextInput 
                                        type="number" 
                                        value={menuItemPrice} 
                                        onChange={(e) => setMenuItemPrice(e.target.value)} 
                                        className="block w-full mt-1"
                                        />
                                        </div>

                                        <div>
                                        <InputLabel value="Item Image" />
                                            <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => setMenuItemImage(e.target.files?.[0] || null)} 
                                            className="block w-full mt-1"
                                            />
                                        </div>
     
                                        <div>
                                        <button 
                                        className="px-3 py-3 mt-4 text-xs text-white rounded-lg bg-cyan-800"
                                        onClick={() => submitMenuItem(menu.id)}
                                        >
                                        Save Item
                                        </button>
                                        </div>
                                    
                                    </div>
                                    <div>
                                    {menu.menuitems.map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-3 mt-2 bg-white border rounded-lg">
                                        
                                            <img src={item.image ? `/${item.image}` : "/nodata.jpg"}  alt={item.name} className="object-cover w-16 h-16 mr-3 rounded-md" />
                                        
                                            <div className="flex ">
                                                <div>
                                                    <h4 className="font-bold">{item.name}</h4>
                                                    <h4 className="">{item.price} MMK</h4>
                                                </div>
                                                <div className="ml-10 mr-10">
                                                <IconEdit size={24} color="green" onClick={() => handleListOpen(item)}/>
                                                </div>
                                            
                                            
                                            </div>
                                            
                                        </div>
                                        ))}
                                    </div>
                                    </>
                                )
                            }

                           
                           
                            
                           
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
                                {/* <Dialog.Title className="text-lg font-semibold">
                                    Edit Menu
                                </Dialog.Title> */}
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
                
                
                <div className="flex justify-end col-span-2 pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => updateData() }>Update Menu Title</button>
                        </div>
                        </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isItemOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsItemOpen(false)}>
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
                                    Edit Item
                                </Dialog.Title>
                                <div className="grid grid-cols-2 gap-4 mx-8">
                                <div>
                                    <InputLabel value="Item Name" />
                                    <TextInput 
                                    type="text" 
                                    value={menuItemName} 
                                    onChange={(e) => setMenuItemName(e.target.value)} 
                                    className="block w-full mt-1"
                                    />
                                </div>

                                <div>
                                <InputLabel value="Price" />
                                <TextInput 
                                type="number" 
                                value={menuItemPrice} 
                                onChange={(e) => setMenuItemPrice(e.target.value)} 
                                className="block w-full mt-1"
                                />
                                </div>

                                <div>
                                <InputLabel value="Item Image" />
                                    <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => setMenuItemImage(e.target.files?.[0] || null)} 
                                    className="block w-full mt-1"
                                    />
                                </div>
                               
                                
                                

                                
                                <div>
                                <button 
                                className="px-3 py-3 mt-4 text-xs text-white rounded-lg bg-cyan-800"
                                onClick={() => updateItem()}
                                >
                                Save Item
                                </button>
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

export default BarMenusNewComponent;