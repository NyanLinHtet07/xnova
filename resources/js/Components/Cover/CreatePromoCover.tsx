import React, { useCallback, useEffect, useState } from "react";
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import {Head} from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Transition, Combobox, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Category } from "@/types/category";
import { Bar } from "@/types/bar";
import { DayPicker } from "react-day-picker";

interface CreatePromoCoverProps{
    fetchBarPromos: () => void
}

const CreatePromoCover:React.FC<CreatePromoCoverProps> = ({
    fetchBarPromos
}) => {

    const [barId, setBarId] = useState<string | null>(null);
    const [bars, setBars] = useState<Bar[]>([]);

    const [image, setImage] = useState<File | null>(null);
    const [imagePrev, setImagePrev] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');;
    const [startPromo, setStartPromo] = useState<Date | undefined>(undefined);
    const [endPromo, setEndPromo] = useState<Date | undefined>(undefined);
    const [showSnackbar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarType, setSnackBarType] = useState('');
    const [query, setQuery] = useState('');

    const filterBars = query === '' 
                ? bars
                : bars.filter(item => 
                                            item.name.toLowerCase().includes(query.toLowerCase())
                                        )
    const selectedBars = bars.find(bar => bar.id === Number(barId)) || null;

    const reset = () => {
        setBarId(null);
        setImage(null);
        setDescription('');
        setStartPromo(undefined);
        setEndPromo(undefined)
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
    

    const handleDescription = (data: string) => {
        setDescription(data);
    }

    const fetchBars = async() => {
        try {
            await axios.get('/api/bar/list/by-name')
                        .then(res =>{
                            setBars(res.data);
                            
                        })
                    }
        catch (err){
            console.log('err is', err)
        }
    }

    const CreateData = async() => {
        const formData = new FormData();

        formData.append('bar_id', String(barId));
        if (image) {
            formData.append('image', image);
        }
        formData.append('description', description);
        formData.append('start_promo', startPromo ? startPromo.toISOString().split("T")[0] : '');
        formData.append('end_promo', endPromo ? endPromo.toISOString().split("T")[0]: '');
        formData.append('is_active', '1');
        formData.append('is_cover', '2');
        try
        {
            await axios.post('/api/bar/promo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            fetchBarPromos();
            reset();
            setSnackBarMessage("Data Uploaded Successfully");
            setSnackBarType('success');
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000 )
        }
        catch(e){
            setSnackBarMessage("Failed to uploaded");
            setSnackBarType("error");
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000)
        }
       
    }


    useEffect(() => {
        fetchBars();
    }, [])


    return (
        
        <div className='bg-white rounded-lg shadow-sm'>
                    <h4 className="pt-4 pb-5 pl-3 text-lg font-semibold text-cyan-900">Create</h4>
                        <div className="grid grid-cols-4 gap-4 mx-8">
                           
                            <div className="col-span-2">
                            <InputLabel value="Bars" className="mb-2 text-lg"/>
                            <Combobox value={barId} onChange={setBarId}>
                                <div className="relative mt-1">
                                <Combobox.Input
                                    className="w-full px-4 py-2 border rounded"
                                    onChange={(e) => setQuery(e.target.value)}
                                    displayValue={() => selectedBars ? selectedBars.name : ''}
                                    placeholder="Search Bars ..."
                                />
                                <Combobox.Options className="absolute w-full mt-1 overflow-auto bg-white border rounded shadow-lg max-h-60">
                                    {filterBars.length === 0 && query !== '' ? (
                                    <div className="px-4 py-2 text-gray-500">No results found</div>
                                    ) : (
                                    filterBars.map((item) => (
                                        <Combobox.Option key={item.id} value={item.id} className="bg-white">
                                        {({ active, selected }) => (
                                            <div
                                            className={`px-4 py-2 cursor-pointer ${
                                                active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                            } ${selected ? 'font-bold' : ''}`}
                                            >
                                            {item.name}
                                            </div>
                                        )}
                                        </Combobox.Option>
                                    ))
                                    )}
                                </Combobox.Options>
                                </div>
                            </Combobox>
                            </div>

                            <div className="flex justify-start col-span-2">
                                                               
                                                                <Popover className="relative mr-20">
                                                                <InputLabel value="Start Promotion" className="mb-2 text-lg"/>
                                                                <PopoverButton className="px-4 py-2 border rounded-lg">
                                                                    {startPromo ? startPromo.toDateString() : "Select Date"}
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
                                                                </Popover>
                                                                
                                                                
                                                               </div>
                                                                
                            
                                                                <div className="col-span-4 h-96">
                                                                    <InputLabel value="Description" className="mb-2 text-lg"/>
                                                                    <ReactQuill
                                                                        value={description}
                                                                        onChange={handleDescription}
                                                                        
                                                                        className="w-full rounded-lg h-72"
                                                                    />
                                                                </div>
                                                            
                            
                                                        
                            
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

                        <div className="flex justify-end col-span-4 pt-10 pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => CreateData() }>Create New Bar</button>
                        </div>

                    
                    
                          

                    </div>
                    <Transition
                        show={showSnackbar}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div 
                            className = {`fixed top-3 fit mx-2 px-4 py-2 rounded-lg shadow-lg text-white ${
                                snackBarType === "success" ? "bg-green-500" : "bg-red-500"
                            }`}>
                            {snackBarMessage}
                        </div>
                    </Transition>
            </div>
       
    )
}

export default CreatePromoCover;