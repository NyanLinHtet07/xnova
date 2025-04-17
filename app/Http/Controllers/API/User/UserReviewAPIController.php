<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BarData;
use App\Models\User;
use App\Models\Review;

class UserReviewAPIController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::with('bar', 'user')
                        ->get();

        return response()->json($reviews, 200);
    }

    public function getBarReview($barId){
        $bar = BarData::findOrFail($barId);

        return $bar->reviews()
                   ->with('user')
                   ->orderBy('created_at', 'desc')
                   ->paginate(20);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'bar_id' => 'required|integer',
            'rating' => 'nullable|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $review = Review::create([
            'user_id' => $request->user_id,
            'bar_id' => $request->bar_id,
            'rating' => $request->rating,
            'review' => $request->review
        ]);

        return  response()->json($review, 201);
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
        //
    }
}
