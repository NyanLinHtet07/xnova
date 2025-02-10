import { BarPromos } from "@/types/bar";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import React, { Fragment, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Popover, PopoverButton, PopoverPanel, } from "@headlessui/react";
import InputLabel from "../InputLabel";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


interface BarPromoListProps {
    promoLists: BarPromos[]
}

const BarPromoListComponent:React.FC<BarPromoListProps> = ({
    promoLists
}) => {
    const headers = ['No', 'Image', 'Description', 'Start Date', 'End Date', 'Edit']
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<BarPromos | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imagePrev, setImagePrev] = useState<string | null>(null);

    const handleOpen = (data: BarPromos) => {
                setSelectedData(data);
                setIsOpen(true);
            }
    const onDrop = useCallback((acceptedFiles: File[]) => {
                        if(acceptedFiles.length > 0){
                            const file = acceptedFiles[0]
                            setImage(file);
                            setImagePrev(URL.createObjectURL(file));
                        }
                    }, []);
            
                 const {getRootProps, getInputProps, isDragActive} = useDropzone({
                    onDrop,
                    multiple: false
                });
                
    const updateData = async() => {

    }
    return (
        <div className='bg-white rounded-lg shadow-sm'>
        <table className="min-w-full border border-collapse border-gray-200">
                    <thead>
                        <tr>
                            {
                                headers.map((header) => (
                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border-b bg-gray">
                                        {header}
                                    </th>
                                ))
                            }
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            promoLists && promoLists.map((promo, index) => (
                                <tr className="hover:bg-gray-50" key={promo.id}>
                                     <td className="px-4 py-2 border-b">
                                        {index + 1}
                                    </td>
                                     <td className="px-4 py-2 border-b">
                                        <img src={promo.image ? `/${promo.image}` : "/nodata.jpg"} alt="cover" className="object-cover w-32 h-32 rounded-lg" />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <div dangerouslySetInnerHTML={{__html: promo.description || ""}} className="text-sm "/>
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {promo.start_promo}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {promo.end_promo}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <IconEdit size={24} color="green" onClick={() => handleOpen(promo)}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
        </table>

        <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-30" />
                            </TransitionChild>
        
                            <div className="fixed inset-0 flex items-center justify-center p-4">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <DialogPanel className="w-7/12 p-6 bg-white rounded-lg shadow-xl ">
                                        <DialogTitle className="text-lg font-semibold">
                                            Edit Promotion
                                        </DialogTitle>

                                        <div className="grid grid-cols-2 gap-4 mx-8">
                       

                       <div className="flex justify-start col-span-4">
                       
                        {/* <Popover className="relative mr-20">
                        <InputLabel value="Start Promotion" className="mb-2 text-lg"/>
                        <PopoverButton className="px-4 py-2 border rounded-lg">
                            {selectedData?.start_promo ? startPromo.toDateString() : "Select Date"}
                        </PopoverButton>
                       
                        <PopoverPanel className="absolute z-10 p-2 bg-white rounded-lg shadow-lg">
                        <DayPicker 
                            mode="single"
                            selected={startPromo}
                            onSelect={setStartPromo}
                        />
                        </PopoverPanel>
                        </Popover>
                      
                       
                        <Popover className="relative">
                        <InputLabel value="End Promotion" className="mb-2 text-lg"/>
                            <PopoverButton className="px-4 py-2 border rounded-lg">
                                {endPromo ? endPromo.toDateString() : "Select End Date"}
                            </PopoverButton>
                            <PopoverPanel className="absolute z-10 p-2 bg-white rounded-lg shadow-lg">
                            <DayPicker
                                mode="single"
                                selected={endPromo}
                                onSelect={setEndPromo}
                            />
                            </PopoverPanel>
                        </Popover> */}
                        
                        
                       </div>
                        

                        {/* <div className="col-span-4 h-96">
                            <InputLabel value="Description" className="mb-2 text-lg"/>
                            <ReactQuill
                                value={description}
                                onChange={handleDescription}
                                
                                className="w-full rounded-lg h-72"
                            />
                        </div> */}
                    

                

                    <div className='justify-start col-span-4 ' {...getRootProps()}>
                    <div className='flex justify-start pl-3 mt-3'>
                        <input {...getInputProps()} />
                            {isDragActive ? (
                                        <IconPlus size={150} className='p-6 rounded-lg bg-slate-200'/>
                                        )  : (
                                            <div className="p-6 ml-10 rounded-lg bg-slate-200">
                                                <p>Click or Drag & Drop an Cover</p>
                                            </div>
                                        )}
            
                                        {imagePrev && (
                                            <img src={imagePrev}  
                                            alt="Selected Preview" 
                                            className='rounded-lg ' 
                                            style={{width:'150px', height:'150px',}} />
                                            )} 
                    </div>
                    </div>
                                       
                        
                                <div className="flex justify-end col-span-4 pb-5 mr-10">
                                    <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => updateData() }>Update Category</button>
                                </div>
                                </div>
                                
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </Dialog>
                    </Transition>
        </div>
    );
}

export default BarPromoListComponent;

function setIsOpen(arg0: boolean) {
    throw new Error("Function not implemented.");
}
