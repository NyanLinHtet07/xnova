import PaginateComponent from '@/Components/PaginateComponent';
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { ReviewType } from '@/types/review';
import { Head, usePage } from '@inertiajs/react';
import { IconStarFilled } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';


export default function BarReviewIndexScreen(){
    const {props} = usePage();
    const {id} = props;

    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

     const fetchReview = async(page: number) => {
            await axios.get(`/api/bars/${id}/reviews`, {
                params: {page}
            })
                        .then(res => {
                            setReviews(res.data.data);
                            setTotalPage(res.data.last_page)
                        })
        }
    const handlePageChange = (page:number) => {
        setCurrentPage(page);
        fetchReview(page)
    }
        useEffect(() => {
            fetchReview(currentPage);
        }, [currentPage]);
    return (
        <AdminAuthenticatedLayout header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Admin Dashboard
            </h2>
        }>
            <Head title='Reviews'/>
            <div className='mx-10'>
           {
            reviews.map((review, index) => (
                <div key={index} className="w-full px-3 py-4 my-2 rounded-lg drop-shadow-lg bg-slate-50">
                    <div className='flex justify-between w-full'>
                        <p>{review.review}</p>
                        <div className="flex text-yellow-600">
                        <IconStarFilled size={14} className="mr-2 text-yellow-600"/>
                       <small> {review.rating} </small>

                    </div>
                    </div>

                    <div className='flex justify-between w-full'>
                    <div>
                    
                        <div className="flex justify-start mt-3">
                            <img src={review.user.profile ? `/${review.user.profile}` : '/nodata.jpg'} className="w-6 h-6 rounded-full" alt="" />
                            <small className="mt-1 ml-2">{review.user.name}</small>
                        </div>
                    </div>
                    <div className="mt-3 ">
                       <small>{moment(review.created_at).format('lll')}</small>

                    </div>
                    </div>
                   
                </div>
            ))
           }
            <PaginateComponent 
                                currentPage={currentPage}
                                totalPages={totalPage}
                                onPageChange={handlePageChange}
                            />
        </div>
        </AdminAuthenticatedLayout>
    )
}