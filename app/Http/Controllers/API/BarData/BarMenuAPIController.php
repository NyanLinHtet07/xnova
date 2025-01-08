<?php

namespace App\Http\Controllers\API\BarData;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BarMenu;

class BarMenuAPIController extends Controller
{
    public function index(){
        $menus = BarMenu::all();

        return response()->json($menus, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bar_id' => 'required',
            'title' => 'required|string',
            'menus' => 'required|string'
        ]);

        $menu = BarMenu::create([
            'bar_id' => $request->bar_id,
            'title' => $request->title,
            'menus' => $request->menus
        ]);

        return response()->json($menu, 200);
    }

    public function show($id)
    {
        $menu = BarMenu::find($id);

        return response()->json($menu, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'bar_id' => 'required',
            'title' => 'required|string',
            'menus' => 'required|string'
        ]);

        $menu = BarMenu::findOrFail($id);

        $menu->update([
            'bar_id' => $request->bar_id,
            'title' => $request->title,
            'menus' => $request->menus
        ]);

        return response()->json($menu, 200);
    }

    public function destroy($id)
    {
        $menu = BarMenu::findOrFail($id);

        $menu->delete();

        return response()->json(['message' => 'Delete Bar Successfully']);
    }
}
