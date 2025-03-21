import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '../../../types/index';
import { useState, useEffect } from 'react';
import { RoleType } from '../../../types/role';
import axios from 'axios';


export default function AdminUserAssignRole({auth}: PageProps){
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<RoleType[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        const fetchUserAndRoles = async() => {
            try{
                const userResponse = await axios.get('/api/users');
                const roleResponse = await axios.get('/api/roles');

                setUsers(userResponse.data);
                setRoles(roleResponse.data);
            } catch(error){
                console.error('Error fetching users and roles: ', error);
            }
        };

        fetchUserAndRoles();
    }, []);

    const assignRole = async() => {
        if(selectedUser && selectedRole){
            try{
                const res = await axios.post(`/api/users/${selectedUser}/assign-role`, {
                    role: selectedRole,
                });

                alert(res.data.message);
            } catch(err){
                console.error("Error assigning role: ", err);
            }
        } else {
            alert('Please Select A User and A Role')
        }
    }

    return (
        <AdminAuthenticatedLayout
        header={<h2 className='text-2xl font-semibold leading-tight text-gray-900 '>Admin Dashboard</h2>}
        >
        <Head title='Admin Dashboard'/>
            <div className='py-12'>
              <h2>Assign Role to User</h2>
              <div>
                <label htmlFor="user">Select User: </label>
                <select 
                    id="user"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value=""> -- Select User --</option>
                    { users.map((user) => (
                        <option value={user.id} key={user.id}>{user.name}</option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="role">Select Role: </label>
                <select
                    id='role'
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value=""> ---- Select Role ----</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                            {role.name}
                        </option>
                    ))}
                </select>
              </div>
              <button onClick={assignRole}>AssignROle</button>
            </div>

        </AdminAuthenticatedLayout>
    )
}