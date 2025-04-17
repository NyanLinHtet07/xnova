import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '../../../types/index';
import React, {useState, useEffect, useCallback, Fragment} from 'react';
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { Dialog, Transition } from "@headlessui/react";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function UserListScreen({auth}: PageProps){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [profile, setProfile] = useState<File | null>(null);
    const [profilePrev, setProfilePrev] = useState<string | null>(null);
    const [id, setID] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0){
            const file = acceptedFiles[0]
            setProfile(file);
            setProfilePrev(URL.createObjectURL(file));
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
                onDrop,
                multiple: false
    })

    const handleOpen = (data: User)=> {
        setName(data.name);
        setPhone(data.phone);
        setID(data.id);
        setIsOpen(true);
    }

    const updateData = async () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('phone', phone);
        if(profile){
            formData.append('profile', profile);
        }
        formData.append('_method', 'PUT');

        try {
            await axios.post(`/api/user/${id}/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setIsOpen(false);
            getUsers();
        }
        catch (err){
           
        }
    }

    const getUsers = async() => {
        await axios.get('/api/users')
                    .then(res => {
                        setUsers(res.data);
                    });
    }

    const geneateQr = async(userId: number) => {
        return axios.put(`/api/users/${userId}/generate-qr`)
                    .then(res => {
                        console.log(res.data);
                        getUsers();
                    })
    }


    useEffect(() => {
        getUsers();
    }, []);

    return (
        <AdminAuthenticatedLayout 
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Admin Dashboard
            </h2>
        }>
            <Head title="User List" />

            <div className="container px-10 mx-auto mt-10">
              
                <table className="min-w-full overflow-hidden text-sm border border-gray-300 rounded-lg bg-slate-100 bg-opacity-95">
                    <thead className="bg-gray-100 rounded-t-lg">
                        <tr>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">ID</th>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Name</th>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Email</th>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Phone</th>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Roles</th>
                            <th className='px-4 py-3 bg-gray-100 border-b-2'> QR Codes</th>
                            <th className='px-4 py-3 bg-gray-100 border-b-2'> Profile</th>
                            <th className='px-4 py-3 bg-gray-100 border-b-2'> Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">{user.id}</td>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">{user.name}</td>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">{user.email}</td>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">{user.phone}</td>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">
                                    {user.roles.map(role => role.name).join(', ')}
                                </td>
                                <td className='px-4 py-3 bg-gray-100 border-b-2'>
                                    {user.qr === null ? <button className='px-3 py-2 text-white rounded-lg bg-cyan-900 drop-shadow-md' onClick={() => geneateQr(user.id)}>Generate Qr</button> : 
                                    <img src={`/${user.qr}`} alt=""
                                    className='object-cover w-32 h-32 rounded-lg' />
                                    }
                                    
                                </td>
                                <td>
                                <img src={user.profile ? `/${user.profile}` : "/nodata.jpg"} alt={user.profile} className="object-cover w-32 h-32 rounded-lg" />
                                </td>
                                <td className="px-4 py-2 border-b">
                                                                  <IconEdit  color="gray" size={24} onClick={() => handleOpen(user)}/>
                                                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
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
                                                    Edit User
                                                </Dialog.Title>
                                                <div className="grid grid-cols-2 gap-4 mx-8">
                                <div className="col-span-2 ">
                                                            <InputLabel value="Category" className="mb-2 text-lg"/>
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
                                {/* <div className="col-span-2 h-96">
                                <InputLabel value="Phone" className="mb-2 text-lg"/>
                                                                <TextInput 
                                                                    type="text" 
                                                                    id="name"
                                                                    name="phone"
                                                                    value={phone}
                                                                    className="block w-full mt-1 "
                                                                    autoComplete="name"
                                                                    onChange={(e) => setPhone(e.target.value)} 
                                                            />
                                </div> */}
                
                                <div className='justify-start col-span-2 ' {...getRootProps()}>
                                <div className='flex justify-start pl-3 mt-3'>
                                            <input {...getInputProps()} />
                                                {isDragActive ? (
                                                            <IconPlus size={150} className='p-6 rounded-lg bg-slate-200'/>
                                                            )  : (
                                                                <div className="p-6 rounded-lg bg-slate-200">
                                                                    <p>Click or Drag & Drop an image</p>
                                                                </div>
                                                            )}
                                
                                                            {profilePrev && (
                                                                <img src={profilePrev}  
                                                                alt="Selected Preview" 
                                                                className='rounded-lg ' 
                                                                style={{width:'150px', height:'150px',}} />
                                                                )} 
                                        </div>
                                </div>
                                <div className="flex justify-end col-span-2 pb-5 mr-10">
                                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => updateData() }>Update User</button>
                                        </div>
                                        </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition>
            </div>
        </AdminAuthenticatedLayout>
    );
}