<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Room::all()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|string|unique:rooms',
            'room_type' => 'required|string',
            'capacity' => 'required|integer',
            'status' => 'required|in:available,occupied,maintenance',
        ]);

        $room = Room::create($validated);
        return response()->json(['data' => $room], 201);
    }

    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);
        $room->update($request->all());
        return response()->json(['data' => $room]);
    }

    public function destroy($id)
    {
        Room::findOrFail($id)->delete();
        return response()->json(['message' => 'Room deleted successfully']);
    }
}
