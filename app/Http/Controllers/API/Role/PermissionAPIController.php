<?php

namespace App\Http\Controllers\API\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionAPIController extends Controller
{
    public function index()
    {
        $permissions = Permission::all()->groupBy('group_name');

        return response()->json($permissions, 200);
    }

    
}
