import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '../../../types/index';
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { RoleType, PermissionType } from '../../../types/role';
import { IconEdit } from '@tabler/icons-react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Dialog, DialogPanel, DialogTitle, Switch, Tab, TabGroup, TabList, TabPanel, TabPanels, Transition, TransitionChild } from '@headlessui/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function RoleAndPermissions({auth}: PageProps){
    const [roles, setRoles] = useState<RoleType[]>([]);
    const [permissions, setPermissions] = useState<{[key: string]: PermissionType[]}>({});
    const [roleName, setRoleName] = useState('');
    const [selectedRoleID, setSelectedRoleID] = useState<Number | null>(null);
    const [selectedRoleName, setSelectedRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [permission, setPermission] = useState<PermissionType[]>([]);
    const [showSnackbar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarType, setSnackBarType] = useState('');
    const [query, setQuery] = useState('');


    const filterRole = query === '' 
    ? roles
    : roles.filter(item => 
                                item.name.toLowerCase().includes(query.toLowerCase())
                            )
    const selectedRoles = roles.find(role => role.id === Number(selectedRoleID)) || null;



    const tabs = ["Create New Role", "Role List"];
    const getRoles = () => {
        axios.get('/api/roles')
        .then(res => {
            setRoles(res.data);
        });

    }

    const getPermissions = () => {
        axios.get('/api/permissions')
        .then(res => {
            setPermissions(res.data);
        })
    };

    const openPermission = (permission: PermissionType[]) => {
        setPermission(permission);
        setIsOpen(true);
    }

    console.log('permission is', permission)

    const openEdit = (role: RoleType) => {
        const permissionIds = role.permissions.map((permission) => permission.id);

        setSelectedRoleID(role.id)
        setSelectedRoleName(role.name)
        setSelectedPermissions(permissionIds);
        setEditOpen(true)
    }

    const handlePermissionChange = (permissionID: number) => {
        setSelectedPermissions((prevSelect) =>
            prevSelect.includes(permissionID)
                    ? prevSelect.filter(id => id !== permissionID)
                    : [...prevSelect, permissionID]
        );
    };

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/roles', {
                name: roleName,
                permissions: selectedPermissions
            });

            alert(response.data.message);
            setRoleName('');
            setSelectedPermissions([]);
            getRoles()
            setSnackBarMessage("Data Uploaded Successfully");
            setSnackBarType('success');
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000 )
        } catch(error){
            console.error('Error creating role', error)
            setSnackBarMessage("Failed to uploaded");
                setSnackBarType("error");
                setShowSnackBar(true);
                setTimeout(() => setShowSnackBar(false), 3000)
        }
    }

    const handleUpdate = async(e:any) => {
        e.preventDefault();
        try{
            const response = await axios.put(`/api/roles/${selectedRoleID}`, {
                name: selectedRoleName,
                permissions: selectedPermissions
            });

            alert(response.data.message);
            getRoles();
            setEditOpen(false);
            setSnackBarMessage("Data Uploaded Successfully");
            setSnackBarType('success');
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000 )
        } catch (error){
            console.error('Error updating role', error)
            setSnackBarMessage("Failed to uploaded");
                setSnackBarType("error");
                setShowSnackBar(true);
                setTimeout(() => setShowSnackBar(false), 3000)
        }
    }

    useEffect(() => {
        getRoles();
        getPermissions();
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
                        <TabGroup>
                                            <TabList className="flex p-1 mt-4 space-x-1 rounded-lg bg-cyan-900/40">
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
                                                        <div className="px-4 py-3 m-3 rounded-lg bg-slate-100">
                                                           <form onSubmit={handleSubmit}>
                                                                <div>
                                                                    <InputLabel htmlFor="name" value="New Role" />
                                                                    <TextInput 
                                                                            type="text" 
                                                                            id="name"
                                                                            name="name"
                                                                            value={roleName}
                                                                            className="block w-full p-2 mt-2 border rounded-lg border-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 "
                                                                            autoComplete="name"
                                                                            placeholder="title ..."
                                                                            onChange={(e) => setRoleName(e.target.value)}
                                                                    />
                                                                </div>
                                                           
                                                                <div className="my-4">
                                                                    <label className="block mb-2 text-lg font-semibold">Assign Permissions</label>
                                                                    {permissions && Object.keys(permissions).length > 0 ? (
                                                                        Object.keys(permissions).map((group) => (
                                                                        <div key={group} className="py-4">
                                                                            <h3 className="text-sm font-bold">{group.toUpperCase()}</h3>
                                                                            <ul className="grid items-center justify-center grid-cols-3 mx-auto">
                                                                            {Array.isArray(permissions[group]) ? (
                                                                                permissions[group].map((prem) => (
                                                                                <div key={prem.id} className="flex items-center ps-3">
                                                                                   <Switch
                                                                                    checked={selectedPermissions.includes(prem.id)}
                                                                                    onChange={() => handlePermissionChange(prem.id)} // Pass `prem.id` directly
                                                                                    className={`${
                                                                                        selectedPermissions.includes(prem.id) ? "bg-cyan-600" : "bg-gray-300"
                                                                                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                                                                                    >
                                                                                    <span
                                                                                        className={`${
                                                                                        selectedPermissions.includes(prem.id) ? "translate-x-6" : "translate-x-1"
                                                                                        } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                                                                                    />
                                                                                    </Switch>
                                                                                    <label
                                                                                    htmlFor={`checkbox-${prem.id}`}
                                                                                    className="w-full py-3 text-sm font-medium capitalize ms-2"
                                                                                    >
                                                                                    {prem.name}
                                                                                    </label>
                                                                                </div>
                                                                                ))
                                                                            ) : (
                                                                                <p className="text-red-500">Invalid permissions format for {group}</p>
                                                                            )}
                                                                            </ul>
                                                                        </div>
                                                                        ))
                                                                    ) : (
                                                                        <p className="text-gray-500">No permissions available.</p>
                                                                    )}
                                                                    </div>
                                                                    <div className="flex items-end justify-end w-full mt-6">
                                                                    <button type="submit" className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-900"> Create New Role </button>
                                                                    </div>

                                                            </form>



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

                                                    </TabPanel>
                                                    <TabPanel
                                                            className="p-3 bg-white shadow rounded-xl">
                                                            <div className=''>
                                                <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                                                    <h3 className="mb-5 font-bold text-cyan-900">Role And Permissions List</h3>
                                                    <table className="min-w-full overflow-hidden text-sm border border-gray-300 rounded-lg bg-slate-100 bg-opacity-95">
                                                    <thead className="bg-gray-100 rounded-t-lg">
                                                        <tr>
                                                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">ID</th>
                                                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">
                                                                Name
                                                            
                                                            </th>
                                                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Permission List</th>
                                                            <th className="px-4 py-3 bg-gray-100 border-b-2">Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            roles.map((role,index) => (
                                                                <tr key={role.id} className="hover:bg-gray-50">
                                                                    <td className="px-4 py-3 text-center border-b-2 border-white">{index + 1}</td>
                                                                    <td className="px-4 py-3 text-sm text-center capitalize border-b-2 border-white">{role.name}</td>
                                                                    <td className="px-4 py-3 text-center border-b-2 border-white">
                                                                        <button className="px-3 py-1 mx-auto text-sm font-bold text-white rounded-lg bg-cyan-800" onClick={() => openPermission(role.permissions)}>
                                                                            Permisions
                                                                        </button>
                                                                    </td>
                                                                    <td className="px-4 py-3 text-center border-b-2 border-white">
                                                                        <IconEdit size={20} className="mx-auto font-bold text-cyan-800" onClick={() => openEdit(role)} />
                                                                    </td>
                                                                    {/* <td className="px-4 py-3 border-b-2 border-white ">
                                                                        <IconTrash color="red" size={20} className="mx-auto " onClick={() =>handleDelete(role.id)} />
                                                                    </td> */}
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                                </div>
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
                                                                                          Permission Lists
                                                                                          </DialogTitle>
                                                                                       
                                                        <div className="col-span-2 ">
                                                            <div className="grid grid-cols-5 gap-4 px-2 py-3 mt-5 bg-white">
                                                                <div className="col-span-4 ">
                                                            <ul className="grid grid-cols-3 px-4 list-disc">
                                                                {permission?.map((per) => (
                                                                    <li key={per.id} className="mb-2 font-bold capitalize text-cyan-900">{per.name}</li>
                                                                    
                                                                ))}
                                                            </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </DialogPanel>
                                                </TransitionChild>
                                                </div>
                                        </Dialog>
                                        </Transition>


                                        <Transition appear show={isEditOpen} as={Fragment}>
                                               <Dialog as="div" className="relative z-50" onClose={() => setEditOpen(false)}>
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
                                                                                          Permission Lists
                                                                                          </DialogTitle>
                                                                                          {permissions && Object.keys(permissions).length > 0 ? (
                                                                        Object.keys(permissions).map((group) => (
                                                                        <div key={group} className="py-4">
                                                                            <h3 className="text-sm font-bold">{group.toUpperCase()}</h3>
                                                                            <ul className="grid items-center justify-center grid-cols-3 mx-auto">
                                                                            {Array.isArray(permissions[group]) ? (
                                                                                permissions[group].map((prem) => (
                                                                                <div key={prem.id} className="flex items-center ps-3">
                                                                                   <Switch
                                                                                    checked={selectedPermissions.includes(prem.id)}
                                                                                    onChange={() => handlePermissionChange(prem.id)} // Pass `prem.id` directly
                                                                                    className={`${
                                                                                        selectedPermissions.includes(prem.id) ? "bg-cyan-600" : "bg-gray-300"
                                                                                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                                                                                    >
                                                                                    <span
                                                                                        className={`${
                                                                                        selectedPermissions.includes(prem.id) ? "translate-x-6" : "translate-x-1"
                                                                                        } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                                                                                    />
                                                                                    </Switch>
                                                                                    <label
                                                                                    htmlFor={`checkbox-${prem.id}`}
                                                                                    className="w-full py-3 text-sm font-medium capitalize ms-2"
                                                                                    >
                                                                                    {prem.name}
                                                                                    </label>
                                                                                </div>
                                                                                ))
                                                                            ) : (
                                                                                <p className="text-red-500">Invalid permissions format for {group}</p>
                                                                            )}
                                                                            </ul>
                                                                        </div>
                                                                        ))
                                                                    ) : (
                                                                        <p className="text-gray-500">No permissions available.</p>
                                                                    )}

<div className="flex items-end justify-end w-full mt-6">
                                <button onClick={handleUpdate} className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-900"> Update Permissions </button>
                                </div>
                                                                                    </DialogPanel>
                                                                                </TransitionChild>

                                                                    </div>
                                                                </Dialog>
                                                                </Transition>

                                                    </TabPanel>
                                            </TabPanels>
                        </TabGroup>
                    </div>
        </AdminAuthenticatedLayout>

        
     )
}