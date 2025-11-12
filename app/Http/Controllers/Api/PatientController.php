<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::with('user')->get();
        return response()->json(['data' => $patients]);
    }

    public function show($id)
    {
        $patient = Patient::with('user')->findOrFail($id);
        return response()->json(['data' => $patient]);
    }

    public function update(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);
        $patient->update($request->all());
        return response()->json(['data' => $patient]);
    }

    public function destroy($id)
    {
        Patient::findOrFail($id)->delete();
        return response()->json(['message' => 'Patient deleted successfully']);
    }
}
