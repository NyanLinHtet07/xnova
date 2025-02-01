import React, { useCallback, useEffect, useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { barImages } from "@/types/bar";

interface BarImageComponentProp {
    cover: string | undefined;
    barID: number | undefined
}

const BarImagesComponent:React.FC<BarImageComponentProp> = ({
    cover,
    barID
}) => {
    const [images, setImages] = useState<File[]>([]);
    const [imgPrev, setImgPrev] = useState<string[]>([]);
    const [barImages, setBarImages] = useState<barImages[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
                if(acceptedFiles.length > 0){
                    
                    setImages(acceptedFiles);
                    const previewUrls = acceptedFiles.map((file) => URL.createObjectURL(file));

                    setImgPrev(previewUrls);
                   
                }
            }, []);
    
         const {getRootProps, getInputProps, isDragActive} = useDropzone({
            onDrop,
            multiple: true
        });

    const getImages = async() => {
        try{
            await axios.get(`/api/bar/gallery/by-bar/${barID}`)
                        .then(res => {
                            setBarImages(res.data);
                        })
        }
        catch(err){
            console.error(err);
        }
    }

    const createImage = async () => {
        const formData = new FormData();

        formData.append('bar_id', String(barID));
        images.forEach((image) => {
            formData.append('images[]', image);
        });

        try{
            await axios.post(`/api/bar/gallery`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImages([]);
            setImgPrev([]);
            getImages();
        }
        catch(err){
            console.error(err);
        }
    }

    const deleteImage = async (id: number) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        
        try {
            await axios.delete(`/api/bar/gallery/${id}`)
                        .then(() => {
                            getImages();
                        })
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getImages();
    }, [barID]);
    return (
        <div>
            <div className="px-3 py-2 my-2 rounded-lg drop-shadow-lg bg-cyan-50 bg-opacity-10">
                   <h2 className='mb-4 text-lg font-bold'>Cover Photo Section</h2>
                    <div>
                        <img src={cover ? `/${cover}` : '/nodata.jpg'} alt="" className='object-cover rounded-lg w-60 h-60' />
                    </div>
            </div>
            <div className="px-3 py-2 my-2 rounded-lg drop-shadow-lg bg-cyan-50 bg-opacity-10">
                   <h2 className='mb-4 text-lg font-bold'>Image Gallary Section</h2>
                   <div className="px-4 py-3 bg-white ">
                   <div className='justify-start col-span-4' {...getRootProps()}>
                        <div className='flex justify-start pl-3 mt-3'>
                                                    <input {...getInputProps()} />
                                                        {isDragActive ? (
                                                            <IconPlus size={150} className='p-6 rounded-lg bg-slate-200'/>
                                                        )  : (
                                                            <IconPlus size={150} className='p-6 rounded-lg bg-slate-200'/>
                                                        )}
                
                                                        {imgPrev && (
                                                            <div className='flex flex-row ml-10 space-x-2' style={{ marginBottom: "10px"}}>
                                                                {
                                                                    imgPrev?.map((pre, index) => (
                                                                        <img src={pre} key={index} alt="Selected Preview" className='rounded-lg ' style={{width:'150px', height:'150px',}} />
                                                                    ))
                                                                }
                                                                
                                                            </div>
                                                        )} 
                                                    </div>
                        </div>
                        <div className="flex justify-end ">
                            <button className="px-4 py-4 mt-5 text-white rounded-lg bg-cyan-900" onClick={() => createImage()}>Upload</button>
                        </div>
                   </div>
                    
                    
                    <div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {
                            barImages && barImages.map((img) => (
                                <div key={img.id} className="relative h-48 w-60">
                                    <IconTrash 
                                        size={24}
                                        color="red"
                                        onClick={() => deleteImage(img.id)}
                                        className="absolute p-1 transition bg-white rounded-full shadow-md cursor-pointer top-2 right-2 hover:bg-red-100"
                                        />
                                        <img src={`/${img.image}`} alt="" className='object-cover h-48 rounded-lg w-60' />
                                </div>
                                
                            ))
                        }
                        
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default BarImagesComponent;