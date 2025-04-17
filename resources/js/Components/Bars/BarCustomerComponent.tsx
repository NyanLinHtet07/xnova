import React, { useEffect, useState } from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import axios from "axios";
import { ReviewType } from '../../types/review';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

interface BarCustomerComponentProps{
    id: number
}

const BarCustomerComponent:React.FC<BarCustomerComponentProps> = ({
    id
}) => {
    const [reviews, setReviews] = useState<ReviewType[]>([]);

    const fetchReview = async() => {
        await axios.get(`/api/bars/${id}/reviews`)
                    .then(res => {
                        setReviews(res.data)
                    })
    }

    useEffect(() => {
        fetchReview();
    }, []);

    console.log("user review is", reviews);
    return (
        <div>
           {
            reviews.map((review, index) => (
                <div key={index} className="flex justify-between w-full px-3 py-4 my-2 rounded-lg drop-shadow-lg bg-slate-50">
                    <div>
                        <p>{review.review}</p>
                        <div className="flex justify-start mt-3">
                            <img src={review.user.profile ? `/${review.user.profile}` : '/nodata.jpg'} className="w-6 h-6 rounded-full" alt="" />
                            <small className="mt-1 ml-2">{review.user.name}</small>
                        </div>
                    </div>
                    <div className="flex text-yellow-600">
                        <IconStarFilled size={14} className="mr-2 text-yellow-600"/>
                       <small> {review.rating} </small>
                    </div>
                </div>
            ))
           }
        </div>
    )
}

export default BarCustomerComponent;