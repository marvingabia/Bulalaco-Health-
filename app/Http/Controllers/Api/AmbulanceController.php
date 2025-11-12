<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ambulance;
use Illuminate\Http\Request;

class AmbulanceController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Ambulance::all()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_number' => 'required|string|unique:ambulances',
            'driver_name' => 'required|string',
            'driver_phone' => 'required|string',
            'status' => 'required|in:available,on-call,maintenance',
            'last_maintenance' => 'required|date',
        ]);

        $ambulance = Ambulance::create($validated);
        return response()->json(['data' => $ambulance], 201);
    }

    public function update(Request $request, $id)
    {
        $ambulance = Ambulance::findOrFail($id);
        $ambulance->update($request->all());
        return response()->json(['data' => $ambulance]);
    }

    public function destroy($id)
    {
        Ambulance::findOrFail($id)->delete();
        return response()->json(['message' => 'Ambulance deleted successfully']);
    }
}
