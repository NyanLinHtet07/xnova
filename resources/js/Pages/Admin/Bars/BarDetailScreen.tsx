import BarMenusComponent from '@/Components/Bars/BarMenusComponent';
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Bar, Menus } from '@/types/bar';
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Dialog, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels, Transition, TransitionChild } from '@headlessui/react';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Category } from '@/types/category';
import BarImagesComponent from '@/Components/Bars/BarImagesComponent';

import 'react-quill/dist/quill.snow.css';

export default function BarDetailScreen() {
    const [bar, setBar] = useState<Bar | null>(null);
    const [menus, setMenus] = useState<Menus[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const {props} = usePage();
    const {id} = props;

    const [name, setName] = useState('');
    const [ownerId, setOwnerId] = useState<string | number>('');
    const [categories, setCategories] = useState<Category[]>([]);
    
    const [cover, setCover] = useState<File | null>(null);
    const [coverPrev, setCoverPrev] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [query, setQuery] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [description, setDescription] = useState('');
    const [locationLat, setLocationLat] = useState('');
    const [locationLong, setLocationLong] = useState('');
    const [web, setWeb] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');


    const tabs = ["Images", "Menus", "Customers"];

    const handleDescription = (data: string) => {
        setDescription(data);
    }

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

    const fetchBar = async() => {
        await axios.get(`/api/bars/${id}`)
                    .then(res => {
                        setBar(res.data);
                        setMenus(res.data.menus);
                    })
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

    const handleOpen = () => {
        setIsOpen(true);
        setName(bar?.name || '');
        setOwnerId(bar?.owner_id || '');
        setCategoryId(bar?.category_id || null);
        setOpeningTime(bar?.opening_time || '' );
        setDescription(bar?.description || '');
        setLocationLat(bar?.location_lat || '');
        setLocationLong(bar?.location_long || '');
        setWeb(bar?.web || '');
        setAddress(bar?.address || '');
        setContact(bar?.contact || '');
    }

    const updateData = async() => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('owner_id', String(ownerId));
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

        formData.append('_method', 'PUT');

        try{
             await axios.post(`/api/bars/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           setIsOpen(false);
           fetchBar();
           
        }
        catch(err){
            
        }
      


    }


    useEffect(() => {
        fetchBar();
        fetchCategory();
    }, [])

    return (
        <AdminAuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    <div className="px-2 py-3 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className='flex justify-end '>
                    <IconEdit size={24} color='green' onClick={() => handleOpen()}/>
                </div>
                        <div className='grid grid-cols-4 px-3 py-1'>
                            <p className='col-span-1 '>
                                Name
                            </p>
                            <p className='col-span-3 '>
                                {bar?.name}
                            </p>
                        </div>
                        <div className='grid grid-cols-4 px-3 py-1'>
                            <p className='col-span-1 '>
                            Opening Hour:
                            </p>
                            <p className='col-span-3 '>
                            {bar?.opening_time}
                            </p>
                        </div>
                        <div className='grid grid-cols-4 px-3 py-1'>
                            <p className='col-span-1 '>
                            Description
                            </p>
                            <p className='col-span-3 '>
                            <div dangerouslySetInnerHTML={{ __html: bar?.description || "" }} className='text-sm '/>
                            </p>
                        </div>
                        <div className='grid grid-cols-4 px-3 py-1'>
                            <p className='col-span-1 '>
                            Website
                            </p>
                            <p className='col-span-3 '>
                            {bar?.web}
                            </p>
                        </div>
                        <div className='grid grid-cols-4 px-3 py-1'>
                            <p className='col-span-1 '>
                            Address
                            </p>
                            <p className='col-span-3 '>
                            {bar?.address}
                            </p>
                        </div>
                        <div className='grid grid-cols-4 px-3 py-1'>
                            <p className='col-span-1 '>
                            Contact
                            </p>
                            <p className='col-span-3 '>
                            {bar?.contact}
                            </p>
                        </div>
                        
                    </div>
                
                <TabGroup>
                    <TabList className="flex p-1 space-x-1 rounded-lg bg-cyan-900/20">
                        {tabs.map((tab) => (
                            <Tab
                                key={tab}
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cyan-700 ${
                                      selected
                                        ? "bg-white shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                    }`}>
                                {tab}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels className="mt-2">
                            <TabPanel
                                className="p-3 bg-white shadow rounded-xl">
                                <BarImagesComponent cover={bar?.cover} barID={bar?.id} />
                            </TabPanel>
                       
                            <TabPanel
                               
                                className="p-3 bg-white shadow rounded-xl">
                                    <BarMenusComponent id={Number(id)} menus ={menus} fetchBar={fetchBar}/>
                                </TabPanel>

                                <TabPanel
                               
                               className="p-3 bg-white shadow rounded-xl">
                                   Hello Desc
                               </TabPanel>
                      
                    </TabPanels>
                </TabGroup>
                </div>

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

                    <div className="fixed inset-0 w-screen p-4 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full">
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
                                    Edit Bar
                                </DialogTitle>
                                <div className="grid grid-cols-2 gap-4 mx-8">
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
                                        <ComboboxInput
                                            className="w-full px-4 py-2 border rounded"
                                            onChange={(e) => setQuery(e.target.value)}
                                            displayValue={() => selectedCategory ? selectedCategory.name : ''}
                                            placeholder="Search Category ..."
                                        />
                                        <ComboboxOptions className="absolute w-full mt-1 overflow-auto bg-white border rounded shadow-lg max-h-60">
                                            {filterCategory.length === 0 && query !== '' ? (
                                            <div className="px-4 py-2 text-gray-500">No results found</div>
                                            ) : (
                                            filterCategory.map((item) => (
                                                <ComboboxOption key={item.id} value={item.id}>
                                                {({ active, selected }) => (
                                                    <div
                                                    className={`px-4 py-2 cursor-pointer ${
                                                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                    } ${selected ? 'font-bold' : ''}`}
                                                    >
                                                    {item.name}
                                                    </div>
                                                )}
                                                </ComboboxOption>
                                            ))
                                            )}
                                        </ComboboxOptions>
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
                                
                        <div className="flex justify-end col-span-2 pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => updateData() }>Update Category</button>
                        </div>
                        
                            </DialogPanel>
                        </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            </div>
        </AdminAuthenticatedLayout>
    );
}
