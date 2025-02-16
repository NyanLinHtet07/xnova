<?php

namespace App\Http\Controllers\API\BarData;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BarMenuItems;

class BarMenuItemsAPIController extends Controller
{
    public function index()
    {
        $menuItems = BarMenuItems::all();

        return response()->json($menuItems, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'menu_id' => 'required',
            'name' => 'required',
            'price' => 'required',
            'image' => 'nullable|mimes:png,jpg,jpeg',
        ]);

        $image = $request->file('image');
        $imagePath = null;

        if($request->hasfile('image')){
            $imagePath = $request->file('image')->store('bar/menu/image', 'public');
            $imagePath = 'storage/' . $imagePath;
        }

        $menuItem = BarMenuItems::create([
            'menu_id' => $request->menu_id,
            'name' => $request->name,
            'price' => $request->price,
            'image' => $imagePath
        ]);

        return response()->json($menuItem, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $menuItem = BarMenuItems::findOrFail($id);

        $request->validate([
            'menu_id' => 'nullable',
            'name' => 'nullable',
            'price' => 'nullable',
            'image' => 'nullable|mimes:png,jpg,jpeg',
        ]);

        $image = $menuItem->image;

        if($request->hasfile('image')){
            $image = $request->file('image')->store('bar/menu/image', 'public');
            $image = 'storage/' . $image;
        }

        $menuItem->update([
            'menu_id' => $request->menu_id ?? $menuItem->menu_id,
            'name' => $request->name ?? $menuItem->name,
            'price' => $request->price ?? $menuItem->price,
            'image' => $image
        ]);

        return response()->json($menuItem, 200);
        
    }


    public function destroy(string $id)
    {
        $menuItem = BarMenuItems::findOrFail($id);
        Storage::disk('public')->delete(str_replace('storage/', '', $image->image));
        $menuItem->delete();
        return response()->json(['message' => 'Delete Category Successfully']);
    }
}
