import BarMenusComponent from '@/Components/Bars/BarMenusComponent';
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Bar, Menus } from '@/types/bar';
import { Tab } from '@headlessui/react';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BarDetailScreen() {
    const [bar, setBar] = useState<Bar | null>(null);
    const [menus, setMenus] = useState<Menus[]>([]);
    const {props} = usePage();
    const {id} = props;

    const tabs = ["Map", "Menus", "Customers"];


    const fetchBar = async() => {
        await axios.get(`/api/bars/${id}`)
                    .then(res => {
                        setBar(res.data);
                        setMenus(res.data.menus);
                    })
    }

    useEffect(() => {
        fetchBar();
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
                        Name: {bar?.name}
                        Opening Hour: {bar?.opening_time}
                        Description: <div dangerouslySetInnerHTML={{ __html: bar?.description || "" }} className='text-sm '/> 
                        Website: {bar?.web}
                        Address: {bar?.address}
                        Contact: {bar?.contact}
                    </div>
                </div>
            </div>

            <div className='w-full px-2 py-4 sm:px-0'>
                <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 rounded-lg bg-cyan-900/20">
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
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                    <Tab.Panel
                               
                               className="p-3 bg-white shadow rounded-xl">
                                   Hello Map
                               </Tab.Panel>
                       
                            <Tab.Panel
                               
                                className="p-3 bg-white shadow rounded-xl">
                                    <BarMenusComponent id={Number(id)} menus ={menus} fetchBar={fetchBar}/>
                                </Tab.Panel>

                                <Tab.Panel
                               
                               className="p-3 bg-white shadow rounded-xl">
                                   Hello Desc
                               </Tab.Panel>
                      
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </AdminAuthenticatedLayout>
    );
}
