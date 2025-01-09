import React, { useCallback, useEffect, useState } from "react";
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { Bar } from "@/types/bar";
import NavLink from "@/Components/NavLink";

export default function BarListScreen() {
   const [barList, setBarList] = useState<Bar[]>([]);

   const fetchDatas = async() => {
        try {
            await axios.get('/api/bars')
                        .then(res =>{
                            setBarList(res.data);
                        })
        }
        catch(err){
            console.error(err);
        }
   }

   useEffect(() => {
    fetchDatas();
   }, []);

   const headers = ["Image", "Name", "Details"];

    return (
        <AdminAuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Bars Dashboard
            </h2>
        }  >
        <Head title="Bars"/>
        <div className="py-12">
        <div className='bg-white rounded-lg shadow-sm'>
                 <table className="min-w-full border border-collapse border-gray-200">
                    <thead>
                        <tr>
                            {
                                headers.map((header) => (
                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border-b bg-gray">
                                        {header}
                                    </th>
                                ))
                            }
                           
                        </tr>
                    </thead>
                    <tbody>
                        {barList && barList.map((bar) => (
                            <tr className="hover:bg-gray-50" key={bar.id}>
                                <td className="px-4 py-2 border-b">
                                    <img src={bar.first_image} alt="" className="object-cover w-24 h-24 rounded-lg" />
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {bar.name}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <Link href={route('admin.bar.detail', {id: bar.id})}
                                        className="px-4 py-2 text-sm text-white rounded-lg bg-cyan-900">
                                        Detail
                                    </Link>
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
                       
            </div>
        </div>
        </AdminAuthenticatedLayout>
    )
}