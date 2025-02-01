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
import PaginateComponent from "@/Components/PaginateComponent";

export default function BarListScreen() {
   const [barList, setBarList] = useState<Bar[]>([]);
   const [loading, setLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);
   const [searchText, setSearchText] = useState("");


   const fetchDatas = async(page: number, search ="") => {
        try {
            await axios.get('/api/bars', {
                params: {page, search}
            })
                        .then(res =>{
                            setBarList(res.data.data);
                            setTotalPage(res.data.last_page);
                        })
        }
        catch(err){
            console.error(err);
        }
   }

   const handlePageChange = (page:number) => {
        setCurrentPage(page);
        fetchDatas(page, searchText)
    }

   const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    fetchDatas(currentPage, value);
    setCurrentPage(1);
   }

   useEffect(() => {
    fetchDatas(currentPage, searchText);
   }, [currentPage]);

   const headers = ["Image", "Name", "Category","Opening"];

    return (
        <AdminAuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Bars Dashboard
            </h2>
        }  >
        <Head title="Bars"/>
        <div className="py-12 mx-auto max-w-7xl">

            
            <div className="mb-4">
                <input
                type="text"
                value={searchText}
                onChange={handleSearch}
                placeholder="Search ...."
                className="w-full px-4 py-2 border rounded-lg"/>
            </div>

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
                                <img src={bar.cover ? `/${bar.cover}` : "/nodata.jpg"} alt={bar.name} className="object-cover w-32 h-32 rounded-lg" />
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {bar.name}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {bar.category ? bar.category.name : '-'}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {bar.opening_time}
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

                 <PaginateComponent 
                                currentPage={currentPage}
                                totalPages={totalPage}
                                onPageChange={handlePageChange}
                            />
                       
            </div>
        </div>
        </AdminAuthenticatedLayout>
    )
}