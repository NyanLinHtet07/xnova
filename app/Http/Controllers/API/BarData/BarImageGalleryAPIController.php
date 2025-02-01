<?php

namespace App\Http\Controllers\API\BarData;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\BarImageGallery;

class BarImageGalleryAPIController extends Controller
{
    public function index()
    {
        //
    }

    public function getDataByBar($id)
    {
        $datas = BarImageGallery::where('bar_id', $id)
                                ->get();

        return response()->json($datas, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bar_id' => 'required',
            'images' => 'array|nullable',
            'images.*' => 'nullable|mimes:png,jpg,jpeg'
        ]);


        $imagePaths = [];

        

        if($request->hasFile('images')){
            foreach($request->file('images') as $image){
                $path = $image->store('bars/gallery', 'public');
                $fullPath = 'storage/' . $path;

                $barImage = BarImageGallery::create([
                    'bar_id' => $request->bar_id,
                    'image' => $fullPath
                ]);

                $imagePaths[] = $fullPath;
            }
        }

        return response()->json([
            'message' => 'Images Uploaded Successfully',
            'images' => $imagePaths
        ]);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = BarImageGallery::findOrFail($id);

        Storage::disk('public')->delete(str_replace('storage/', '', $image->image));

        $image->delete();

        return response()->json(['message' => 'Delete Image Successfully']);
    }
}
