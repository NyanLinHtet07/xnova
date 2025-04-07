import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '../../../types/index';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UserListScreen({auth}: PageProps){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async() => {
        await axios.get('/api/users')
                    .then(res => {
                        setUsers(res.data);
                    });
    }

    const geneateQr = async(userId: number) => {
        return axios.put(`/api/users/${userId}/generate-qr`)
                    .then(res => {
                        console.log(res.data);
                        getUsers();
                    })
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <AdminAuthenticatedLayout 
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Admin Dashboard
            </h2>
        }>
            <Head title="User List" />

            <div className="container px-10 mx-auto mt-10">
              
                <table className="min-w-full overflow-hidden text-sm border border-gray-300 rounded-lg bg-slate-100 bg-opacity-95">
                    <thead className="bg-gray-100 rounded-t-lg">
                        <tr>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">ID</th>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Name</th>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Email</th>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Phone</th>
                            <th className="px-4 py-3 bg-gray-100 border-b-2 ">Roles</th>
                            <th className='px-4 py-3 bg-gray-100 border-b-2'> QR Codes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">{user.id}</td>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">{user.name}</td>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">{user.email}</td>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">{user.phone}</td>
                                <td className="px-4 py-3 bg-gray-100 border-b-2 ">
                                    {user.roles.map(role => role.name).join(', ')}
                                </td>
                                <td className='px-4 py-3 bg-gray-100 border-b-2'>
                                    {user.qr === null ? <button className='px-3 py-2 text-white rounded-lg bg-cyan-900 drop-shadow-md' onClick={() => geneateQr(user.id)}>Generate Qr</button> : 
                                    <img src={`/${user.qr}`} alt=""
                                    className='object-cover w-32 h-32 rounded-lg' />
                                    }
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminAuthenticatedLayout>
    );
}