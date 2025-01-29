import React, {useState, useCallback, useEffect} from "react";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useDropzone } from 'react-dropzone';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import InputLabel from "../InputLabel";
import { IconPlus } from "@tabler/icons-react";

interface CreateCategoryTabProps{
    fetchDatas: () => void;
} 

const CreateCategoryTab:React.FC<CreateCategoryTabProps> = ({
    fetchDatas
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState<File | null>(null);
    const [iconPrev, setIconPrev] = useState<string | null>(null);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarType, setSnackBarType] = useState('');
    
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

    const createData = async() => {
        const formData = new FormData();

        formData.append('name', name);
        if (icon) {
            formData.append('icon', icon);
        }
        formData.append('description', description);

        try{
            await axios.post(`/api/categories`, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchDatas();
            setSnackBarMessage("Data Uploaded Successfully");
            setSnackBarType('success');
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000 )
        }
        catch (err){
            setSnackBarMessage("Failed to uploaded");
            setSnackBarType("error");
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000)
        }
    }

    useEffect(() => {
        return() => {
            if(iconPrev){
                URL.revokeObjectURL(iconPrev);
            }
        }
    })

    return (
        <div className='bg-white rounded-lg shadow-sm'>
             <h4 className="pt-4 pb-5 pl-3 text-lg font-semibold text-cyan-900">Create Category</h4>
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
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => createData() }>Create Category</button>
                        </div>
             </div>
             <Transition
                                     show={showSnackBar}
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
    )
}

export default CreateCategoryTab;