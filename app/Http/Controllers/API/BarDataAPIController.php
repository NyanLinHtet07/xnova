<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BarData;

class BarDataAPIController extends Controller
{

    public function index()
    {
        // $barDatas = BarData::all();

        // $barDatas->transform( function($bar){
        //     $decodedImages = collect(json_decode($bar->images));
  
        //     $bar->first_image = $decodedImages->isNotEmpty() ? url(str_replace('\\', '/', $decodedImages->first())) : null;
          
  
        //     unset($bar->images);
  
        //     return $bar;
        //   });

        $barDatas = BarData::with('category')
                        ->select('id', 'name', 'cover', 'opening_time', 'category_id')
                        ->orderBy('created_at', 'desc')
                        ->get();

        return response()->json($barDatas, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'owner_id' => 'nullable',
            'category_id' => 'nullable',
            'cover' => 'nullable|mimes:png,jpg,jpeg',
            'images' => 'array|nullable',
            'images.*' => 'nullable|mimes:jpg,jpeg,png',
            'opening_time' => 'nullable',
            'description' => 'nullable',
            'location_lat' => 'nullable',
            'location_long' => 'nullable',
            'web' => 'nullable',
            'address' => 'nullable',
            'contact' => 'nullable'
        ]);

        $images = $request->file('images');
        $imagePaths = [];

        $cover = $request->file('cover');
        $coverPath = null;

        if($request->hasFile('images')){
            foreach ($request->file('images') as $image){
                if($image->isValid()){
                    // $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    // $image->move(public_path('uploads/bars'), $filename);
                    // $imagePaths[] = 'uploads/bars/' . $filename;
                    $path = $image->store('bars', 'public');
                    $imagePaths[] = 'storage/' . $path;
                }
            }
        }

        if($request->hasFile('cover')){
            // $filename = uniqid() . '.' . $cover->getClientOriginalExtension();
            // $cover->move(public_path('uploads/bars/cover'), $filename);
            // $coverPath = 'uploads/bars/cover/' . $filename;
            $coverPath = $request->file('cover')->store('bars/cover', 'public');
            $coverPath = 'storage/' . $coverPath;
        }

        $bars = BarData::create([
            'name' => $request->name,
            'owner_id' => $request->owner_id,
            'category_id' => $request->category_id,
            'cover' => $coverPath,
            'images' => json_encode($imagePaths),
            'opening_time' => $request->opening_time,
            'description' => $request->description,
            'location_lat' => $request->location_lat,
            'location_long' => $request->location_long,
            'web' => $request->web,
            'address' => $request->address,
            'contact' => $request->contact
        ]);

        return response()->json($bars, 200);

        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bar = BarData::with('menus')
                        ->findOrFail($id);

        $bar->images = collect(json_decode($bar->image))->map(function ($imagePath){
            return url(str_replace('\\' , '/', $imagePath));
        });

        return response()->json($bar, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bar = BarData::findOrFail($id);

        $request->validate([
            'name' => 'nullable|string',
            'owner_id' => 'nullable',
            'category_id' => 'nullable',
            'cover' => 'nullable',
            'images' => 'array|nullable',
            'images.*' => 'nullable|mimes:jpg,jpeg,png',
            'opening_time' => 'nullable',
            'description' => 'nullable',
            'location_lat' => 'nullable',
            'location_long' => 'nullable',
            'web' => 'nullable',
            'address' => 'nullable',
            'contact' => 'nullable'
        ]);

        $imagePaths = $bar->images ? json_decode($bar->images, true) : [];


        if($request->hasFile('images')){
            foreach ($request->file('images') as $image){
                if($image->isValid()){
                    $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $image->move(public_path('uploads/bars'), $filename);
                    $imagePaths[] = 'uploads/property/' . $filename;
                }
            }
        }

        $bar->update([
            'name' => $request->name,
            'owner_id' => $request->owner_id,
            'category_id' => $request->category_id,
            'images' => json_encode($imagePaths),
            'opening_time' => $request->opening_time,
            'description' => $request->description,
            'location_lat' => $request->location_lat,
            'location_long' => $request->location_long,
            'web' => $request->web,
            'address' => $request->address,
            'contact' => $request->contact
        ]);

        return response()->json($bar, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $bar = BarData::findOrFail($id);

        $bar->delete();

        return response()->json(['message' => 'Delete Bar Successfully']);
    }
}
