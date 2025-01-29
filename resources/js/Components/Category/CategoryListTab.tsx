import React, {Fragment, useCallback, useEffect, useState} from "react";
import { Category } from '../../types/category';
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { Dialog, Transition } from "@headlessui/react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import axios from "axios";




interface CategoryListProps {
    categories: Category[],
    deleteData: (id: number) => void;
    fetchDatas: () => void;
}

const CategoryListTab:React.FC<CategoryListProps> = ({
    categories,
    deleteData,
    fetchDatas
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState<File | null>(null);
    const [id, setID] = useState<number | null>(null);
     const [iconPrev, setIconPrev] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

     const onDrop = useCallback((acceptedFiles: File[]) => {
            if(acceptedFiles.length > 0){
                const file = acceptedFiles[0]
                setIcon(file);
                setIconPrev(URL.createObjectURL(file));
            }
        }, []);
    
        const {getRootProps, getInputProps, isDragActive} = useDropzone({
            onDrop,
            multiple: false
        })
    
        const handleDescription = (data: string) => {
            setDescription(data);
        }


    const handleOpen = (data: Category) => {

        setName(data.name);
        setDescription(data.description);
        setID(data.id);
        //setIcon(data.icon);
        setIsOpen(true);
    }

    const updateData = async () => {
        const formData = new FormData();

        formData.append('name', name);
        if (icon) {
            formData.append('icon', icon);
        }
        formData.append('description', description);
        formData.append('_method', 'PUT');

        try{
            await axios.post(`/api/categories/${id}`, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            
            });
            setIsOpen(false);
            fetchDatas();
            
        }
        catch (err){
           
        }
    }

    useEffect(() => {
            return() => {
                if(iconPrev){
                    URL.revokeObjectURL(iconPrev);
                }
            }
        })

 const headers = ['Icon', 'Name', 'Description', 'Edit', 'Delete'];

    return (
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
                        {categories && categories.map((cat) => (
                            <tr className="hover:bg-gray-50" key={cat.id}>
                                <td className="px-4 py-2 border-b">
                                <img src={cat.icon ? `/${cat.icon}` : "Empty Cover"} alt={cat.name} className="object-cover w-20 h-20 rounded-lg" />
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {cat.name}
                                </td>
                               
                                <td className="px-4 py-2 border-b">
                                  <div dangerouslySetInnerHTML={{ __html: cat?.description || "" }} className='text-sm '/> 
                                </td>
                                <td className="px-4 py-2 border-b">
                                  <IconEdit  color="gray" size={24} onClick={() => handleOpen(cat)}/>
                                </td>
                                <td className="px-4 py-2 border-b">
                                <IconTrash  color="red" size={24} onClick={() => deleteData(cat.id)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>

                 <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 w-full" onClose={() => setIsOpen(false)}>
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
                            <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                                <Dialog.Title className="text-lg font-semibold">
                                    My Modal Title
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
                <div className="col-span-2 h-96">
                                            <InputLabel value="Description" className="mb-2 text-lg"/>
                                            <ReactQuill
                                                value={description}
                                                onChange={handleDescription}
                                                
                                                className="w-full rounded-lg h-72"
                                            />
                </div>

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
                
                                            {iconPrev && (
                                                <img src={iconPrev}  
                                                alt="Selected Preview" 
                                                className='rounded-lg ' 
                                                style={{width:'150px', height:'150px',}} />
                                                )} 
                        </div>
                </div>
                <div className="flex justify-end col-span-2 pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => updateData() }>Update Category</button>
                        </div>
                        </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
                       
            </div>
    )
}

export default CategoryListTab;