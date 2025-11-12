<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'gender' => 'required|in:male,female,other',
            'ip_status' => 'required|in:yes,no',
            'tribe' => 'nullable|string',
            'medical_condition' => 'required|string',
            'medical_status' => 'required|in:stable,critical,under_observation',
        ]);

        // Check if this is the first user
        $isFirstUser = User::count() === 0;

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $isFirstUser ? 'admin' : 'patient',
        ]);

        // Create patient record
        Patient::create([
            'user_id' => $user->id,
            'full_name' => $validated['name'],
            'address' => $validated['address'],
            'phone_number' => $validated['phone_number'],
            'gender' => $validated['gender'],
            'ip_status' => $validated['ip_status'],
            'tribe' => $validated['tribe'],
            'medical_condition' => $validated['medical_condition'],
            'medical_status' => $validated['medical_status'],
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'is_admin' => $isFirstUser,
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'data' => $request->user()
        ]);
    }
}
