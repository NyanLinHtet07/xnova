import React, {Fragment, useEffect, useState} from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import axios from "axios";
import { Menus } from "@/types/bar";
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Dialog, Transition } from "@headlessui/react";


interface BarAmentiesComponentProps{
    id: number,
    fetchBar: () => void;
    amenities: string
}

interface amentiesList{
    id: number;
    name: string
}

const BarAmentiesComponent:React.FC<BarAmentiesComponentProps> = ({
    id,
    fetchBar,
    amenities
}) => {
    const [amenty, setAmenty] = useState<amentiesList[]>([]);
    const [newName, setNewName] = useState<string>("");
    const [amenitiesList, setAmenitiesList] = useState(
        amenities ? JSON.parse(amenities) : []
    );
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        try {
            const parsedAmenties = amenities ? JSON.parse(amenities) : [];
            setAmenty(parsedAmenties);
        } catch(e){
            console.error("Error parsing amenities:", e);
            setAmenty([]);
        }
    }, [amenities])
    

    const addAmanties = () => {
        if(newName.trim() === "" ) return;

        const newTask: amentiesList = {
            id: Date.now(),
            name: newName,

        };

        setAmenty([...amenty, newTask]);
        setNewName("");
        
    }

    const deleteAmenty = (id:number) => {
        setAmenty(amenty.filter((m) => m.id !== id));
    }

    const submitData = async() => {
        const formData = {
            amenities: JSON.stringify(amenty)
        }

        await axios.put(`/api/bar/${id}/update-amenties`, formData)
                    .then(res => {
                        fetchBar();
                        setAmenty([]);
                        setIsOpen(false)
                    })
    }

     const handleOpen = () => {
                setIsOpen(true);
            }

  


    return (
        <div>
            {
                amenty.length === 0 ? (
                    <div className="px-4 py-2 ">
                    <h3 className="text-lg font-bold ">Create Amenties</h3>
                    <div className="px-4 py-3 mb-5 rounded-lg bg-gray-50">
                        
                         <div className="grid grid-cols-5 gap-4 px-2 py-3 mt-5 bg-white">
                            <div className="col-span-4 ">
                            <InputLabel value="Name" className="mb-2 text-lg"/>
                            <TextInput 
                                                            type="text" 
                                                            id="menu"
                                                            name="Name"
                                                            value={newName}
                                                            className="w-full mt-1"
                                                            autoComplete="name"
                                                            onChange={(e) => setNewName(e.target.value)} 
                                                    />
                            </div>
                            
    
                            <div className="col-span-1 ">
                            <button
                                onClick={addAmanties}
                                className="px-4 py-2 mt-8 text-white rounded-full bg-cyan-900 hover:bg-cyan-800"
                                >
                                Add
                                </button>
                            </div>
                          
                       
                         </div>
                         <div>
                            <ul className="list-disc spcae-y-4">
                                {
                                    amenty.map((m) => (
                                        <li
                                            key={m.id}
                                            className="grid grid-cols-5 py-2 ml-10">
                                            <span className="col-span-2 ">{m.name}</span>
                                           
                                            <span className="col-span-1 ">
                                                <button onClick={() =>deleteAmenty(m.id)} className="px-3 py-1 text-sm text-white rounded-lg bg-red-950">Delete</button>
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
                ) :
                (
                    <div className="px-4 py-2 mx-4 my-2 bg-gray-100 rounded-lg ">
                              <span className="flex justify-end space-x-3">
                                                                    <IconEdit size={24} color="green" onClick={() => handleOpen()}/>
                                                                    
                                                                </span>
                           <h4>Amenities List</h4>
                            <ul className="ml-10 list-disc spcae-y-4">
                                {amenty.map((m) => (
                                    <li className="py-2 ml-10" key={m.id}>
                                        {m.name}
                                    </li>
                                ))}
                            </ul>
                           
                        </div>
                )
            }
           
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
                                               Edit Amenities
                                           </Dialog.Title>
                                           <div className="grid grid-cols-2 gap-4 mx-8">
                         
                           </div>
                           <div className="col-span-2 ">
                               <div className="grid grid-cols-5 gap-4 px-2 py-3 mt-5 bg-white">
                                   <div className="col-span-4 ">
                                   <InputLabel value="Name" className="mb-2 text-lg"/>
                                   <TextInput 
                                                                   type="text" 
                                                                   id="menu"
                                                                   name="menu"
                                                                   value={newName}
                                                                   className="w-full mt-1"
                                                                   autoComplete="name"
                                                                   onChange={(e) => setNewName(e.target.value)} 
                                                           />
                                   </div>
                                  
           
                                   <div className="col-span-1 ">
                                   <button
                                       onClick={addAmanties}
                                       className="px-4 py-2 mt-8 text-white rounded-full bg-cyan-900 hover:bg-cyan-800"
                                       >
                                       Add
                                       </button>
                                   </div>
                                 
                              
                                </div>
                                <div>
                                   <ul className="p-3 list-disc rounded-lg spcae-y-4 bg-gray-50">
                                       {
                                           amenty.map((m) => (
                                               <li
                                                   key={m.id}
                                                   className="grid grid-cols-5 py-2 ml-10">
                                                   <span className="col-span-4 ">{m.name}</span>
                                                   
                                                   <span className="col-span-1 ">
                                                       <button onClick={() =>deleteAmenty(m.id)} className="px-3 py-1 text-sm text-white rounded-lg bg-red-950">Delete</button>
                                                   </span>
                                               </li>
                                           ))
                                       }
                                   </ul>
                                </div>
                               </div>
                           
                           <div className="flex justify-end col-span-2 pb-5 mt-4 mr-10">
                                       <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => submitData() }>Update Amenities</button>
                                   </div>
                                   
                                       </Dialog.Panel>
                                   </Transition.Child>
                               </div>
                           </Dialog>
                       </Transition>


            
        </div>
    )
}

export default BarAmentiesComponent;