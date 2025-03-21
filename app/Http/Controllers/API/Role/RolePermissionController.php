<?php

namespace App\Http\Controllers\API\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;


class RolePermissionController extends Controller
{
    public function getRoles()
    {
     
            return response()->json(Role::all());
        
    }

    public function getPermissions()
    {
        $permissions = Permission::all()->groupBy('group_name');
        return response()->json($permissions);
    }

    public function assignRole(Request $request)
    {
        $user = User::find($request->user_id);
        $user->syncRoles($request->role);
        return response()->json(['message' => 'Role assigned successfully']);
    }
}
