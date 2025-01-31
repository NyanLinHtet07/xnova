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
import { Transition, Combobox } from "@headlessui/react";
import { Category } from "@/types/category";

export default function BarCreateScreen() {
    const [name, setName] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    const [cover, setCover] = useState<File | null>(null);
    const [coverPrev, setCoverPrev] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState(null);
    const [query, setQuery] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [description, setDescription] = useState('');
    const [locationLat, setLocationLat] = useState('');
    const [locationLong, setLocationLong] = useState('');
    const [web, setWeb] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [showSnackbar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarType, setSnackBarType] = useState('');


    const filterCategory = query === '' 
                ? categories
                : categories.filter(item => 
                                            item.name.toLowerCase().includes(query.toLowerCase())
                                        )
    const selectedCategory = categories.find(cat => cat.id === categoryId) || null;

    const onDrop = useCallback((acceptedFiles: File[]) => {
            if(acceptedFiles.length > 0){
                const file = acceptedFiles[0]
                setCover(file);
                setCoverPrev(URL.createObjectURL(file));
            }
        }, []);

     const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false
    });
    

    const handleDescription = (data: string) => {
        setDescription(data);
    }

    const fetchCategory = async() => {
        try {
            await axios.get('/api/categories')
                        .then(res =>{
                            setCategories(res.data);
                        })
                    }
        catch (err){
            console.log('err is', err)
        }
    }

    const createData = async() => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('owner_id', ownerId);
        formData.append('category_id', String(categoryId));
        formData.append('opening_time', openingTime);
        formData.append('description', description);
        formData.append('location_lat', locationLat);
        formData.append('location_long', locationLong);
        formData.append('web', web);
        formData.append('address', address);
        formData.append('contact', contact);
        // images.forEach((image) => {
        //     formData.append('images[]', image);
        // });
        if (cover) {
            formData.append('cover', cover);
        }

        try{
             await axios.post(`/api/bars`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           
            setSnackBarMessage("Data Uploaded Successfully");
            setSnackBarType('success');
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000 )
           
        }
        catch(err){
            //console.error('Error uploading', err);

            setSnackBarMessage("Failed to uploaded");
            setSnackBarType("error");
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000)
        }
      


    }

    useEffect(() => {
        return() => {
            if(coverPrev){
                URL.revokeObjectURL(coverPrev);
            }
        }
    })

    useEffect(() => {
        fetchCategory();
    }, [])


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
                        <div className="grid grid-cols-4 gap-4 mx-8">
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

                         

                            <div className="col-span-2 ">
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
                            <div className="col-span-1">
                            <InputLabel value="Category" className="mb-2 text-lg"/>
                            <Combobox value={categoryId} onChange={setCategoryId}>
                                <div className="relative mt-1">
                                <Combobox.Input
                                    className="w-full px-4 py-2 border rounded"
                                    onChange={(e) => setQuery(e.target.value)}
                                    displayValue={() => selectedCategory ? selectedCategory.name : ''}
                                    placeholder="Search Category ..."
                                />
                                <Combobox.Options className="absolute w-full mt-1 overflow-auto bg-white border rounded shadow-lg max-h-60">
                                    {filterCategory.length === 0 && query !== '' ? (
                                    <div className="px-4 py-2 text-gray-500">No results found</div>
                                    ) : (
                                    filterCategory.map((item) => (
                                        <Combobox.Option key={item.id} value={item.id}>
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

                            <div className="col-span-2 ">
                            <InputLabel value="Phone" className="mb-2 text-lg"/>
                                <TextInput 
                                    type="text" 
                                    id="contact"
                                    name="contact"
                                    value={contact}
                                    className="block w-full mt-1 "
                                    autoComplete="name"
                                    onChange={(e) => setContact(e.target.value)} 
                            />
                            </div>

                            <div className="col-span-2">
                            <InputLabel value="Address" className="mb-2 text-lg"/>
                                <TextInput 
                                    type="text" 
                                    id="address"
                                    name="address"
                                    value={address}
                                    className="block w-full mt-1 "
                                    autoComplete="long"
                                    onChange={(e) => setAddress(e.target.value)} 
                            />
                            </div>

                            <div className="col-span-2 ">
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

                            <div className="col-span-2 ">
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

                            <div className="col-span-4 ">
                            <InputLabel value="Website Link" className="mb-2 text-lg"/>
                                <TextInput 
                                    type="text" 
                                    id="web"
                                    name="web"
                                    value={web}
                                    className="block w-full mt-1 "
                                    autoComplete="long"
                                    onChange={(e) => setWeb(e.target.value)} 
                            />
                            </div>
                            

                            <div className="col-span-4 h-96">
                            <InputLabel value="Description" className="mb-2 text-lg"/>
                            <ReactQuill
                                value={description}
                                onChange={handleDescription}
                                
                                className="w-full rounded-lg h-72"
                            />
                        </div>
                        </div>

                        {/* <div>
                        <input type="file" onChange={handleFileChange} />
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
                
                                            {coverPrev && (
                                                <img src={coverPrev}  
                                                alt="Selected Preview" 
                                                className='rounded-lg ' 
                                                style={{width:'150px', height:'150px',}} />
                                                )} 
                        </div>
                        </div>
                        
                        {/* <div className='justify-start col-span-4 ' {...getRootProps()}>
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
                        </div> */}
                       
                       

                        <div className="flex justify-end pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => createData() }>Create New Bar</button>
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
        </AdminAuthenticatedLayout>
    )
}