import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Category } from '../../../types/category';
import CreateCategoryTab from '@/Components/Category/CreateCategoryTab';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryListTab from '@/Components/Category/CategoryListTab';


export default function CategoryIndex() {
    const [categories, setCategories] = useState<Category[]>([]);
    const tabs = ["Create Category", "Category List"];

    const fetchDatas = async () => {
        try{
            await axios.get(`/api/categories`)
                        .then(res => {
                            setCategories(res.data);
                        })
        }
        catch(err){
            console.error(err);
        }
    }

    const deleteData = async (id: number) => {
        try {
            await axios.delete(`/api/categories/${id}`)
                        .then(() => {
                            fetchDatas();
                        })
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchDatas();
    }, [])
    return (
         <AdminAuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Category Dashboard
                        </h2>
                    }
                >
         <Head title="Category" />
        <div className="w-full px-2 py-4 sm:px-0">
        <TabGroup>
        <TabList className="flex p-1 space-x-2 rounded-lg bg-cyan-900/20">
           {
            tabs.map((tab) => (
                
                        <Tab
                            key={tab}
                            className={({selected}) =>
                            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cyan-700 ${
                                selected ? "bg-white shadow"
                                        : "text-cyan-900 hover:bg-white/[0.12] hover:text-white"
                            }`
                            }>
                            {tab}
                        </Tab>
            ))}
                    </TabList>

                    <TabPanels className="mt-2">
                        <TabPanel
                            className="p-3 bg-white shadow rounded-xl">
                               <CreateCategoryTab fetchDatas={fetchDatas}/>
                        </TabPanel>
                        <TabPanel
                            className="p-3 bg-white shadow rounded-xl">
                                <CategoryListTab categories={categories} deleteData={deleteData} fetchDatas={fetchDatas}/>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
                
            
           
        </div>
        </AdminAuthenticatedLayout>
    )
}
