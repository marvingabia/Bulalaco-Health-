<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Medicine::all()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'quantity' => 'required|integer',
            'unit' => 'required|string',
            'expiry_date' => 'required|date',
            'supplier' => 'required|string',
        ]);

        $medicine = Medicine::create($validated);
        return response()->json(['data' => $medicine], 201);
    }

    public function update(Request $request, $id)
    {
        $medicine = Medicine::findOrFail($id);
        $medicine->update($request->all());
        return response()->json(['data' => $medicine]);
    }

    public function destroy($id)
    {
        Medicine::findOrFail($id)->delete();
        return response()->json(['message' => 'Medicine deleted successfully']);
    }
}
