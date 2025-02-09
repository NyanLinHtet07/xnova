<?php

namespace App\Http\Controllers\API\BarData;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BarData;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\BarDataImport;
use Illuminate\Support\Facades\Storage;

class BarDataAPIController extends Controller
{

    public function index(Request $request)
    {
        $query = BarData::query();

        if($search = $request->input('search')){
            $query->where('name', 'LIKE', "%{$search}%")

            ->orWhereHas('category', function($q) use ($search){
                $q->where('name', 'LIKE', "%{$search}%");
            });
        }
        $barDatas = $query->with('category')
                        ->select('id', 'name', 'cover', 'opening_time', 'category_id')
                        ->orderBy('created_at', 'desc')
                        ->paginate(20);

        return response()->json($barDatas, 200);
    }

    public function importDataBtExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv'
        ]);

        $file = $request->file('file');

        Excel::import(new BarDataImport, $file);
        
        return response()->json(['message' => 'File imported successfully!'], 200);

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
        $bar = BarData::with('menus', 'category', 'images', 'promos')
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
        $cover = $bar->cover;

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
            $cover = $request->file('cover')->store('bars/cover', 'public');
            $cover = 'storage/' . $cover;
        }



        $bar->update([
            'name' => $request->name,
            'owner_id' => $request->owner_id,
            'category_id' => $request->category_id,
            'cover' => $cover,
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
