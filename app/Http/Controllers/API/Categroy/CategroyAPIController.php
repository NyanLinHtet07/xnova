<?php

namespace App\Http\Controllers\API\Categroy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategroyAPIController extends Controller
{

    public function index()
    {
        $categories = Category::all();

        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'icon' => 'nullable|mimes:png,jpg,jpeg',
            'description' => 'nullable'
        ]);

        $icon = $request->file('icon');
        $iconPath = null;

        if($request->hasFile('icon')){
            $iconPath = $request->file('icon')->store('category/icon', 'public');
            $iconPath = 'storage/' . $iconPath;
        }

        $category = Category::create([
            'name' => $request->name,
            'icon' => $iconPath,
            'description' => $request->description
        ]);

        return response()->json($category, 200);
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
        $category = Category::findOrFail($id);

        $name = $request->input('name');
        $description = $request->input('description');
        
        $icon = $category->icon;

        if($request->hasFile('icon')){
            $icon = $request->file('icon')->store('category/icon', 'public');
            $icon = 'storage/' . $icon;
        }

        $category->update([
            'name' => $name ?? $category->name,
            'icon' => $icon,
            'description' => $description ?? $category->description
        ]);

        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json(['message' => 'Delete Category Successfully']);
    }
}
