<?php

namespace App\Http\Controllers\API\BarData;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BarPromo;
use Illuminate\Support\Facades\Storage;

class BarPromoAPIController extends Controller
{
 
    public function index()
    {
        $promos = BarPromo::with('bar')
                            ->all();

        return response()->json($promos, 200);
    }

    public function promoListByBar($id){
        $promos = BarPromo::where('bar_id', $id)
                            ->get();

        return response()->json($promos, 200);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'bar_id' => 'required',
            'image' => 'required',
            'description' => 'nullable',
            'start_promo' => 'nullable',
            'end_promo' => 'nullable'
        ]);

        if($request->hasFile('image')){
            $image = $request->file('image');
            $path = $image->store('bars/promo', 'public');
            $fullpath = 'storage/' . $path;
        }

        $barPromo = BarPromo::create([
            'bar_id' => $request->bar_id,
            'image' => $fullpath,
            'description' => $request->description,
            'start_promo' => $request->start_promo,
            'end_promo' => $request->end_promo
        ]);

        return response()->json([
            'message' => 'Uploaded Successfully',
        ]);
    }

    public function show(string $id)
    {
        $barPromo = BarPromo::findOrFail($id)
                            ->with('bar')
                            ->get();

        return response()->json($barPromo, 200);
    }


    public function update(Request $request, string $id)
    {
        $barPromo = BarPromo::findOrFail($id);
        
        $request->validate([
            'bar_id' => 'required',
            'image' => 'required',
            'description' => 'nullable',
            'start_promo' =>'nullable',
            'end_promo' =>'nullable',
            'is_active' => 'nullable',
            'is_cover' => 'nullable'
        ]);

        $image = $barPromo->image;

        if($request->hasFile('image')){
            $image = $request->file('image');
            $path = $image->store('bars/promo', 'public');
            $fullpath = 'storage/' . $path;
        }

        $barPromo->update([
            'bar_id' => $request->bar_id,
            'image' => $image,
            'description' => $request->description,
            'start_promo' => $request->start_promo,
            'end_promo' => $request->end_promo,
            'is_active' => $request->is_active,
            'is_cover' => $request->is_cover
        ]);

        return response()->json($barPromo, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $barPromo = BarPromo::findOrFail($id);

        Storage::disk('public')->delete(str_replace('storage/', '', $image->image));

        $barPromo->delete();

        return response()->json($barPromo, 200);
    }
}
