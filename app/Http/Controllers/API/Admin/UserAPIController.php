<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class UserAPIController extends Controller
{
    public function index()
    {
        $users = User::with('roles')
                        ->get();

        return response()->json($users, 200,);
    }

    public function owners()
    {
        $owners = User::whereHas('roles', function($query){
            $query->where('name', 'owner');
        }) ->get();

        return response()->json($owners, 200);
    }

    public function fetchUserByRole($role)
    {
        $users = User::with('roles')
                    ->whereHas('roles', function($query) use ($role){
            $query->where('name', $role);
        })->get();

        return response()->json($users, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required'],
            'phone' => 'nullable|string',
            'role' => 'required|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);

        $user->syncRoles([$request->input('role')]);

        return response()->json($user, 200);
    }

    public function assignRole(Request $request, $id)
    {
        $request -> validate([
            'role' => 'required|exists:roles,name',
        ]);

      $user = User::findOrFail($id);

      $user->syncRoles([$request->input('role')]);



        return response()->json(['message' => 'Role assigned successfully']);
    }

    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message'=>'Deleted User'], 200);
    }

    public function generateQr($userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $qrImage = QrCode::format('svg')->size(300)->generate($user->email);
        $filePath = 'qrcodes/user-' . $user->id . '.svg';
        Storage::disk('public')->put($filePath, $qrImage);
        $user->qr = 'storage/' . $filePath;
        $user->save();

        return response()->json([
            'message' => 'QR code generated successfully',
        ]);
    }

}
