import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import React, {useCallback, useState} from "react";
import { useDropzone } from "react-dropzone";
import InputLabel from "../InputLabel";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { format } from "path";

interface CreateBarDetailProps{
    id: number,
    fetchBarPromos: () => void;
}

const CreateBarPromoComponent:React.FC<CreateBarDetailProps> = ({
    id,
    fetchBarPromos
}) => {
    const [image, setImage] = useState<File | null>(null);
    const [imagePrev, setImagePrev] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');;
    const [startPromo, setStartPromo] = useState<Date | undefined>(undefined);
    const [endPromo, setEndPromo] = useState<Date | undefined>(undefined);
    const [showSnackbar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarType, setSnackBarType] = useState('');

    const handleDescription = (data: string) => {
        setDescription(data);
    }

      const onDrop = useCallback((acceptedFiles: File[]) => {
                    if(acceptedFiles.length > 0){
                        const file = acceptedFiles[0]
                        setImage(file);
                        setImagePrev(URL.createObjectURL(file));
                    }
                }, []);
        
             const {getRootProps, getInputProps, isDragActive} = useDropzone({
                onDrop,
                multiple: false
            });
            
        const CreateData = async() => {
            const formData = new FormData();

            formData.append('bar_id', id.toString());
            if (image) {
                formData.append('image', image);
            }
            formData.append('description', description);
            formData.append('start_promo', startPromo ? startPromo.toISOString().split("T")[0] : '');
            formData.append('end_promo', endPromo ? endPromo.toISOString().split("T")[0]: '');
            try
            {
                await axios.post('/api/bar/promo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                fetchBarPromos();
                setSnackBarMessage("Data Uploaded Successfully");
                setSnackBarType('success');
                setShowSnackBar(true);
                setTimeout(() => setShowSnackBar(false), 3000 )
            }
            catch(e){
                setSnackBarMessage("Failed to uploaded");
                setSnackBarType("error");
                setShowSnackBar(true);
                setTimeout(() => setShowSnackBar(false), 3000)
            }
           
        }
    return (
        <div>
          <div className="grid grid-cols-2 gap-4 mx-8">
                       

                                   <div className="col-span-2">
                                    <Popover className="relative">
                                    <PopoverButton className="px-4 py-2 border rounded-lg">
                                        {startPromo ? startPromo.toDateString() : "Select Date"}
                                    </PopoverButton>
                                   
                                    <PopoverPanel className="absolute z-10 p-2 bg-white rounded-lg shadow-lg">
                                    <DayPicker 
                                        mode="single"
                                        selected={startPromo}
                                        onSelect={setStartPromo}
                                    />
                                    </PopoverPanel>
                                    </Popover>
                                   </div>

                                   <div className="col-span-2">
                                    <Popover className="relative">
                                        <PopoverButton className="px-4 py-2 border rounded-lg">
                                            {endPromo ? endPromo.toDateString() : "Select End Date"}
                                        </PopoverButton>
                                        <PopoverPanel className="absolute z-10 p-2 bg-white rounded-lg shadow-lg">
                                        <DayPicker
                                            mode="single"
                                            selected={endPromo}
                                            onSelect={setEndPromo}
                                        />
                                        </PopoverPanel>
                                    </Popover>
                                    
                                    
                                   </div>
                                    

                                    <div className="col-span-4 h-96">
                                        <InputLabel value="Description" className="mb-2 text-lg"/>
                                        <ReactQuill
                                            value={description}
                                            onChange={handleDescription}
                                            
                                            className="w-full rounded-lg h-72"
                                        />
                                    </div>
                                

                            

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
                        
                                                    {imagePrev && (
                                                        <img src={imagePrev}  
                                                        alt="Selected Preview" 
                                                        className='rounded-lg ' 
                                                        style={{width:'150px', height:'150px',}} />
                                                        )} 
                                </div>
                                </div>
                                
                        <div className="flex justify-end col-span-4 pb-5 mr-10">
                            <button className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800" onClick={() => CreateData() }>
                                Create Promotion
                            </button>
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
    )
}

export default CreateBarPromoComponent;