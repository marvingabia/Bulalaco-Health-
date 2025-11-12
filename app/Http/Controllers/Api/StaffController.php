<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Staff::all()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:staff,email|unique:users,email',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|same:password',
            'position' => 'required|string',
            'department' => 'required|string',
            'phone_number' => 'required|string',
            'address' => 'required|string',
            'age' => 'required|integer|min:18|max:100',
            'status' => 'nullable|in:on-duty,off-duty',
            'assigned_room' => 'nullable|string',
        ]);

        // Set default status if not provided
        if (!isset($validated['status'])) {
            $validated['status'] = 'off-duty';
        }

        // Use database transaction to ensure both records are created
        DB::beginTransaction();
        try {
            // Create user account for staff login
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'staff', // Set role as staff
            ]);

            // Create staff record
            $staff = Staff::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'position' => $validated['position'],
                'department' => $validated['department'],
                'phone_number' => $validated['phone_number'],
                'address' => $validated['address'],
                'age' => $validated['age'],
                'status' => $validated['status'],
                'assigned_room' => $validated['assigned_room'] ?? null,
                'user_id' => $user->id, // Link to user account
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Staff registered successfully with login account',
                'data' => $staff,
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Staff registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $staff = Staff::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:staff,email,' . $id,
            'position' => 'sometimes|required|string',
            'department' => 'sometimes|required|string',
            'phone_number' => 'sometimes|required|string',
            'address' => 'sometimes|required|string',
            'age' => 'sometimes|required|integer|min:18|max:100',
            'status' => 'sometimes|in:on-duty,off-duty',
            'assigned_room' => 'nullable|string',
        ]);
        
        $staff->update($validated);
        return response()->json(['data' => $staff]);
    }

    public function destroy($id)
    {
        Staff::findOrFail($id)->delete();
        return response()->json(['message' => 'Staff deleted successfully']);
    }
}
