import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import { PermissionType, RoleType } from '@/types/role';

const AssignRoleAndPermission = () => {
    const [roles, setRoles] = useState<RoleType[]>([]);
    const [permissions, setPermissions] = useState<Record<string, PermissionType[]>>({});
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        axios.get('/api/roles')
            .then(res => setRoles(res.data));

        axios.get('/api/permissions')
                .then(res => setPermissions(res.data));
    }, []);

    const assignRole = () => {
        axios.post('/api/assign-role', {
            user_id: selectedUser,
            role: selectedRole
        }).then(() => alert("ROle assigned"))
    }

    return (
        <AdminAuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Assign Roles
            </h2>
        } >
               <Head title="Asign Roles"/>
        <div>
            <h2>Assign Role to User</h2>
            <select onChange={e => setSelectedRole(e.target.value)} >
                <option>Select Role</option>
                {roles.map(role =><option key={role.id} value={role.name}>{role.name}</option>)}
                
            </select>
            <input type="text" placeholder="User ID" onChange={e => setSelectedUser(e.target.value)} />

            <button onClick={assignRole}>Assign Role</button>
            <h2>Permissions</h2>
            {Object.keys(permissions).map(group => (
                <div key={group}>
                <h3>{group}</h3>
                <ul>
                    {permissions[group]?.map(perm => <li key={perm.id}>{perm.name}</li>)}
                </ul>
                </div>
            ))}
        </div>
        </AdminAuthenticatedLayout>
    )
}

export default AssignRoleAndPermission;