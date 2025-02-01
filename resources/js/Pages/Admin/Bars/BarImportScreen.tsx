import React, { useCallback, useEffect, useState } from "react";
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import {Head} from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';

import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";


export default function BarImportScreen() {
   

    const [file, setFile] = useState<File | null>(null);

   
    const [showSnackbar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarType, setSnackBarType] = useState('');


   

    const onDrop = useCallback((acceptedFiles: File[]) => {
            if(acceptedFiles.length > 0){
                const file = acceptedFiles[0]
                setFile(file);
                
            }
        }, []);

     const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv']
        }
    });
    

    

    const handleUpload = async() => {
        if (!file) {
            setSnackBarMessage("Please Select File First");
            setSnackBarType('error');
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000)
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        

        try{
             await axios.post(`/api/import/barData`, formData, {
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

   



    return (
        <AdminAuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Import Bars
            </h2>
        }  >
        <Head title="Menu"/>
        <div className="py-12 mx-4">
        <div className='bg-white rounded-lg shadow-sm'>
                    <h4 className="pt-4 pb-5 pl-3 text-lg font-semibold text-cyan-900">Import Restaurants  & Bars</h4>
                        <div className="grid grid-cols-4 gap-4 mx-8">
                         
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
                            {file && <p className="mt-2">Selected File: {file.name}</p>}
                
                        </div>
                        </div>
                        
                      
                       

                        <div className="flex justify-end col-span-4 pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => handleUpload() }>Import Datas</button>
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
            </div>
        </AdminAuthenticatedLayout>
    )
}