<?php

namespace App\Http\Controllers\API\EarthQuick;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\helpRequest;

class HelpRequestAPIController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $helpRequests = helpRequest::all();
        return response()->json($helpRequests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $request->validate([
            'name' => 'nullable|string|max:255',
            'count' => 'nullable|integer',
            'needs' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:15',
            'status' => 'nullable|string|max:50',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $helpRequest = helpRequest::create([
            'name' => $request->name,
            'count' => $request->count,
            'needs' => $request->needs,
            'phone' => $request->phone,
            'status' => $request->status,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);
        return response()->json($helpRequest, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $helpRequest = helpRequest::findOrFail($id);
        return response()->json($helpRequest);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'count' => 'nullable|integer',
            'needs' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:15',
            'status' => 'nullable|string|max:50',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $helpRequest = helpRequest::findOrFail($id);
        $helpRequest->update($request->all());
        return response()->json($helpRequest, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $helpRequest = helpRequest::findOrFail($id);
        $helpRequest->delete();
        return response()->json(null, 204);
    }
}
