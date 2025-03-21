<?php

namespace App\Http\Controllers\API\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RoleAPIController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();

        return response()->json($roles, 200);
    }
    
    public function store(Request $request)
    {
       $validated =  $request->validate([
            'name' => 'required | string | unique:roles',
            'permissions' => 'required|array',
            'permission.*' => 'exists:permissions, id'
        ]);

        $role = Role::create(['name' => $validated['name']]);

        $role->syncPermissions($validated['permissions']);

        return response()->json(['message' => 'Role created with permissions successfully']);
    }

    public function update(Request $request, $id)
    {
        $role = Role::find($id);

        $validated  = $request->validate([
            'name' => 'required',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role->update(['name' => $validated['name']]);

        $role->syncPermissions($validated['permissions']);

        return response()->json(['message' => 'Role updated with permisssions successfully']);
    }

    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);

        $role->syncPermissions([]);

        $role->delete();

        return response()->json(['message' => 'Role and its permissions deleted successfully']);
    }
}
