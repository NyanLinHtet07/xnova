import { BarPromos } from "@/types/bar";
import React from "react";

interface BarPromoListProps {
    promoLists: BarPromos[]
}

const BarPromoListComponent:React.FC<BarPromoListProps> = ({
    promoLists
}) => {
    const headers = ['No', 'Image', 'Description', 'Start Date', 'End Date']
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
                                        <div dangerouslySetInnerHTML={{__html: promo.description || ""}} className="text-sm "/>
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {promo.start_promo}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {promo.end_promo}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
        </table>
        </div>
    );
}

export default BarPromoListComponent;