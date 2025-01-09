import React, { useCallback, useState } from "react";
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import {Head} from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function BarCreateScreen() {
    const [name, setName] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [prev, setPrev] = useState<string[]>([]);

    const [openingTime, setOpeningTime] = useState('');
    const [description, setDescription] = useState('');
    const [locationLat, setLocationLat] = useState('');
    const [locationLong, setLocationLong] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0){
    
            setImages(acceptedFiles);

            const previewUrls = acceptedFiles.map((file) => URL.createObjectURL(file))
            setPrev(previewUrls);
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: true
    });

    const handleDescription = (data: string) => {
        setDescription(data);
    }

    const createData = async() => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('owner_id', ownerId);
        formData.append('opening_time', openingTime);
        formData.append('description', description);
        formData.append('location_lat', locationLat);
        formData.append('location_long', locationLong)
        images.forEach((image) => {
            formData.append('images[]', image);
        });

        try{
            const res = await axios.post(`/api/bars`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('data is', res)
        }
        catch(err){
            console.error('Error uploading', err);
        }


    }


    return (
        <AdminAuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Bars Dashboard
            </h2>
        }  >
        <Head title="Menu"/>
        <div className="py-12">
        <div className='bg-white rounded-lg shadow-sm'>
                    <h4 className="pt-4 pb-5 pl-3 text-lg font-semibold text-cyan-900">Create</h4>
                        <div className="grid grid-cols-2 gap-4 mx-8">
                            {/* <div className="col-span-1 ">
                            <InputLabel value="Owners" className="mb-2 text-lg"/>
                                 <Autocomplete
                                        size='small' 
                                        disablePortal
                                        options={owners}
                                        className='w-full'
                                        autoHighlight
                                        getOptionLabel={(option) => option.name}
                                        onChange={(e, newValue) => {
                                                setSelectedOwner(newValue ? newValue.id: null)
                                                                    }}
                                        renderInput={(params) => (
                                                                <TextField
                                                                        label="Owners List ..."
                                                                        className='border-0 '
                                                                        {...params}
                                                                        slotProps={{
                                                                        htmlInput: {
                                                                                    ...params.inputProps,
                                                                                    autoComplete: 'new-password', 
                                                                                                                },
                                                                                                              }}
                                                                                                            />
                                                                                                          )}
                                    />
                           
                            </div> */}

                         

                            <div className="col-span-1 ">
                            <InputLabel value="Bar Name" className="mb-2 text-lg"/>
                                <TextInput 
                                    type="text" 
                                    id="name"
                                    name="name"
                                    value={name}
                                    className="block w-full mt-1 "
                                    autoComplete="name"
                                    onChange={(e) => setName(e.target.value)} 
                            />
                            </div>

                            <div className="col-span-1 ">
                            <InputLabel value="Opening Hour" className="mb-2 text-lg"/>
                                <TextInput 
                                    type="text" 
                                    id="time"
                                    name="time"
                                    value={openingTime}
                                    className="block w-full mt-1 "
                                    autoComplete="time"
                                    onChange={(e) => setOpeningTime(e.target.value)} 
                            />
                            </div>

                            <div className="col-span-1 ">
                            <InputLabel value="Latitude" className="mb-2 text-lg"/>
                                <TextInput 
                                    type="text" 
                                    id="lat"
                                    name="lat"
                                    value={locationLat}
                                    className="block w-full mt-1 "
                                    autoComplete="name"
                                    onChange={(e) => setLocationLat(e.target.value)} 
                            />
                            </div>

                            <div className="col-span-1 ">
                            <InputLabel value="Longtitude" className="mb-2 text-lg"/>
                                <TextInput 
                                    type="text" 
                                    id="long"
                                    name="long"
                                    value={locationLong}
                                    className="block w-full mt-1 "
                                    autoComplete="long"
                                    onChange={(e) => setLocationLong(e.target.value)} 
                            />
                            </div>

                            <div className="col-span-2 h-96">
                            <InputLabel value="Description" className="mb-2 text-lg"/>
                            <ReactQuill
                                value={description}
                                onChange={handleDescription}
                                
                                className="w-full rounded-lg h-72"
                            />
                        </div>
                        </div>
                        
                        <div className='justify-start col-span-4 ' {...getRootProps()}>
                        <div className='flex justify-start pl-3 mt-3'>
                                                    <input {...getInputProps()} />
                                                        {isDragActive ? (
                                                            <IconPlus size={150} className='p-6 rounded-lg bg-slate-200'/>
                                                        )  : (
                                                            <IconPlus size={150} className='p-6 rounded-lg bg-slate-200'/>
                                                        )}
                
                                                        {prev && (
                                                            <div className='flex flex-row ml-10 space-x-2' style={{ marginBottom: "10px"}}>
                                                                {
                                                                    prev?.map((pre, index) => (
                                                                        <img src={pre} key={index} alt="Selected Preview" className='rounded-lg ' style={{width:'150px', height:'150px',}} />
                                                                    ))
                                                                }
                                                                
                                                            </div>
                                                        )} 
                                                    </div>
                        </div>
                       
                       

                        <div className="flex justify-end pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => createData() }>Create New Bar</button>
                        </div>
                          

                    </div>
            </div>
        </AdminAuthenticatedLayout>
    )
}