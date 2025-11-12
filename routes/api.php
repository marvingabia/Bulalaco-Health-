<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\MedicineController;
use App\Http\Controllers\Api\AmbulanceController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/staff', [StaffController::class, 'store']); // Public staff registration
Route::get('/staff', [StaffController::class, 'index']); // Public staff viewing
Route::get('/rooms', [RoomController::class, 'index']); // Public room viewing
Route::post('/rooms', [RoomController::class, 'store']); // Public room creation

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Patient routes
    Route::apiResource('patients', PatientController::class);
    
    // Admin only routes
    Route::middleware('admin')->group(function () {
        Route::apiResource('staff', StaffController::class)->except(['index', 'store']);
        Route::apiResource('rooms', RoomController::class)->except(['index', 'store']);
        Route::apiResource('medicines', MedicineController::class);
        Route::apiResource('ambulances', AmbulanceController::class);
    });
});
