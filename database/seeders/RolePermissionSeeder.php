<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Admin', 'Owner', "User"];

        $permissions = [
            'User Management' => ['create-user', 'edit-user', 'delete-user', 'view-user'],
            'Post Management' => ['create-post', 'edit-post', 'delete-post', 'view-post'],
        ];

        foreach($roles as $roleName){
            $role = Role::firstOrCreate(['name' => $roleName]);

            foreach($permissions as $group => $perms){
                foreach ($perms as $perm){
                    $permission = Permission::firstOrCreate([
                        'name' => $perm,
                        'group_name' => $group,
                    ]);
                    $role->givePermissionTo($permission);
                }
            }
        }
    }
}
