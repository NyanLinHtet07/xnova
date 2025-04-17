import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import CreateBarPromoComponent from '@/Components/Bars/CreateBarPromoComponent';
import axios from 'axios';
import { BarPromos } from '../../../types/bar';
import { useEffect, useState } from 'react';
import BarPromoListComponent from '@/Components/Bars/BarPromoListComponent';

const tabs = ['Create Promotion', 'Active Promotion List', 'Deactive Promotion List']
export default function BarPromoIndexScreen(){
    const [promoLists, setPromoLists] = useState<BarPromos[]>([]);
    const [activepromoList, setActivePromoLists] = useState<BarPromos[]>([]);
    const [deActivepromoList, setDeActivePromoLists] = useState<BarPromos[]>([]);

    const {props} = usePage();
    const {id} = props;

    const fetchBarPromos = async() => {
        try{
           const res = await axios.get(`/api/bar/promo/by-bar/${id}`)
           const promos = res.data;
            setPromoLists(promos);
            setActivePromoLists(promos.filter((list: { is_active: number; }) => list.is_active === 1));
            setDeActivePromoLists(promos.filter((list: { is_active: number; }) => list.is_active === 0));
                        
        } catch(e){
            console.log(e)
        }
    }

    const filterActive = () => {
        return promoLists?.filter((list) => (
              list.is_active == 1
        ))
    }

    useEffect(() => {
        fetchBarPromos()
    }, []);

   

   
    

    return (
        <AdminAuthenticatedLayout  header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Admin Dashboard
            </h2>
        }>
            <Head title="Promotion"/>
            <div className='py-12'>
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
                        <CreateBarPromoComponent id={id as number} fetchBarPromos={fetchBarPromos}/>               
                    </TabPanel>
                    <TabPanel
                        className="p-3 bg-white shadow rounded-xl">
                       <BarPromoListComponent promoLists = {activepromoList} fetchBarPromos={fetchBarPromos} active={1}/>                
                    </TabPanel>
                    <TabPanel
                        className="p-3 bg-white shadow rounded-xl">
                       <BarPromoListComponent promoLists = {deActivepromoList} fetchBarPromos={fetchBarPromos} active={0}/>                
                    </TabPanel>
                </TabPanels>
                </TabGroup>
             
            </div>
        </AdminAuthenticatedLayout>
    )
}