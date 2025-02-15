import React, { useCallback, useEffect, useState } from "react";
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Dialog, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels, Transition, TransitionChild } from '@headlessui/react';
import { BarPromos } from "@/types/bar";
import PromoCoverList from "@/Components/Cover/PromoCoverList";
import CreatePromoCover from "@/Components/Cover/CreatePromoCover";

export default function PromotionCoverIndex() {
    const tabs = ['Create Cover', 'Cover List', 'Pending Cover'];
    const [promoList, setPromoList] = useState<BarPromos[]>([]);
    const [pendingPromoList, setPendingPromoList] = useState<BarPromos[]>([]);

    const fetchPromos = async() => {
        try{
          const res =  await axios.get('/api/covers')
            const promoData = res.data            
            setPromoList(promoData.filter((list: {is_cover: number}) => list.is_cover === 2));
            setPendingPromoList(promoData.filter((list: {is_cover:number}) => list.is_cover === 1));
                       
        }
        catch(e){
            console.error('err is', e)
        }
    }

    useEffect(() => {
        fetchPromos()
    }, [])


    return (
        <AdminAuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Promotion Covers
            </h2>
        }  >
        <Head title="Bars"/>
        <div className="pt-2 mx-auto max-w-7xl">
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
                    <CreatePromoCover fetchBarPromos={fetchPromos}/>
                </TabPanel>
                <TabPanel
                    className="p-3 bg-white shadow rounded-xl">
                    <PromoCoverList promoLists={promoList} fetchBarPromos={fetchPromos}/>
                </TabPanel>
                <TabPanel
                    className="p-3 bg-white shadow rounded-xl">
                    <PromoCoverList promoLists={pendingPromoList} fetchBarPromos={fetchPromos}/>
                </TabPanel>
            </TabPanels>
        </TabGroup>
            
            
        </div>
        </AdminAuthenticatedLayout>
    )
}