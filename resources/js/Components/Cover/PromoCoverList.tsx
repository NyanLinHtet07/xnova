import { BarPromos } from "@/types/bar";
import { IconEdit, IconEye, IconEyeClosed, IconPlus } from "@tabler/icons-react";
import React, { Fragment, useCallback, useState } from "react";

import 'react-quill/dist/quill.snow.css';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios";


interface BarPromoListProps {
    promoLists: BarPromos[],
    fetchBarPromos: () => void,
    //active: number
}

const PromoCoverList:React.FC<BarPromoListProps> = ({
    promoLists,
    fetchBarPromos,
    //active
}) => {
    const headers = ['No', 'Image', 'Bar','Description', 'Start Date', 'End Date' ,'Status', 'Active']
  


                
    const updateData = async(promo: BarPromos, active: number) => {
       
            promo.is_active = active
        
        
        try{
            await axios.put(`/api/bar/promo/${promo.id}`, promo)
            .then(() => {
                fetchBarPromos()
            })
        }
        catch(e){
            console.error('err')
        }

      
    }

    const approveCover = async(promo: BarPromos) => {
       
        promo.is_cover = 2
        try{
            await axios.put(`/api/bar/promo/${promo.id}`, promo)
            .then(() => {
                fetchBarPromos()
            })
        }
        catch(e){
            console.error('err')
        }

      
    }
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
                        {
                            promoLists && promoLists.map((promo, index) => (
                                <tr className="hover:bg-gray-50" key={promo.id}>
                                     <td className="px-4 py-2 border-b">
                                        {index + 1}
                                    </td>
                                     <td className="px-4 py-2 border-b">
                                        <img src={promo.image ? `/${promo.image}` : "/nodata.jpg"} alt="cover" className="object-cover w-32 h-32 rounded-lg" />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {promo.bar.name}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <div dangerouslySetInnerHTML={{__html: promo.description || ""}} className="text-sm "/>
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {promo.start_promo}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {promo.end_promo}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        { promo.is_cover == 1 ? 
                                                ( <button onClick={() => approveCover(promo)} className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800">Approve</button>):
                                          promo.is_cover == 2 ?
                                                ( <p className="font-semibold text-gray-800 ">Approved</p> ): null
                                        }
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                    {promo.is_active == 1 ? (
                                        <button onClick={() => updateData(promo, 0 )} className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800">
                                            Inactive
                                        </button>
                                    ) : promo.is_active == 0 ? (
                                        <button onClick={() => updateData(promo, 1 )} className="px-3 py-2 text-sm text-white rounded-lg bg-cyan-800">
                                            Active
                                        </button>
                                    ) : null}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
        </table>

        
        </div>
    );
}

export default PromoCoverList;


