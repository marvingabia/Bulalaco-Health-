<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing rooms first
        Room::truncate();
        
        $rooms = [
            // ========== PATIENT ROOMS ==========
            // Patient Rooms
            ['room_number' => 'PR-101', 'room_type' => 'patient_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'PR-102', 'room_type' => 'patient_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'PR-103', 'room_type' => 'patient_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'PR-104', 'room_type' => 'patient_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'PR-105', 'room_type' => 'patient_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            
            // Private Rooms
            ['room_number' => 'PVT-201', 'room_type' => 'private_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'PVT-202', 'room_type' => 'private_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'PVT-203', 'room_type' => 'private_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'PVT-204', 'room_type' => 'private_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            
            // Isolation Rooms
            ['room_number' => 'ISO-301', 'room_type' => 'isolation_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'ISO-302', 'room_type' => 'isolation_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'ISO-303', 'room_type' => 'isolation_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            
            // ICU Rooms
            ['room_number' => 'ICU-401', 'room_type' => 'icu_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'ICU-402', 'room_type' => 'icu_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'ICU-403', 'room_type' => 'icu_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'ICU-404', 'room_type' => 'icu_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'ICU-405', 'room_type' => 'icu_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            
            // NICU Rooms
            ['room_number' => 'NICU-501', 'room_type' => 'nicu_room', 'capacity' => 6, 'status' => 'occupied', 'current_occupants' => 4],
            ['room_number' => 'NICU-502', 'room_type' => 'nicu_room', 'capacity' => 6, 'status' => 'occupied', 'current_occupants' => 3],
            ['room_number' => 'NICU-503', 'room_type' => 'nicu_room', 'capacity' => 6, 'status' => 'available', 'current_occupants' => 0],
            
            // ========== TREATMENT AND PROCEDURE ROOMS ==========
            // Operating Rooms
            ['room_number' => 'OR-01', 'room_type' => 'operating_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'OR-02', 'room_type' => 'operating_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'OR-03', 'room_type' => 'operating_room', 'capacity' => 1, 'status' => 'maintenance', 'current_occupants' => 0],
            ['room_number' => 'OR-04', 'room_type' => 'operating_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            
            // Delivery Rooms
            ['room_number' => 'DR-01', 'room_type' => 'delivery_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'DR-02', 'room_type' => 'delivery_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'DR-03', 'room_type' => 'delivery_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            
            // Emergency Rooms
            ['room_number' => 'ER-01', 'room_type' => 'emergency_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'ER-02', 'room_type' => 'emergency_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'ER-03', 'room_type' => 'emergency_room', 'capacity' => 1, 'status' => 'occupied', 'current_occupants' => 1],
            ['room_number' => 'ER-04', 'room_type' => 'emergency_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'ER-05', 'room_type' => 'emergency_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            
            // ========== SUPPORT AND DIAGNOSTIC ROOMS ==========
            // X-Ray Rooms
            ['room_number' => 'XRAY-01', 'room_type' => 'xray_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'XRAY-02', 'room_type' => 'xray_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'XRAY-03', 'room_type' => 'xray_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            
            // MRI Rooms
            ['room_number' => 'MRI-01', 'room_type' => 'mri_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'MRI-02', 'room_type' => 'mri_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            
            // CT Scan Rooms
            ['room_number' => 'CT-01', 'room_type' => 'ct_scan_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'CT-02', 'room_type' => 'ct_scan_room', 'capacity' => 1, 'status' => 'available', 'current_occupants' => 0],
            
            // Laboratory Rooms
            ['room_number' => 'LAB-01', 'room_type' => 'laboratory_room', 'capacity' => 5, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'LAB-02', 'room_type' => 'laboratory_room', 'capacity' => 5, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'LAB-03', 'room_type' => 'laboratory_room', 'capacity' => 3, 'status' => 'available', 'current_occupants' => 0],
            
            // ========== ADMINISTRATIVE SUPPORT ROOMS ==========
            // Administrative Offices
            ['room_number' => 'ADMIN-01', 'room_type' => 'admin_office', 'capacity' => 5, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'ADMIN-02', 'room_type' => 'admin_office', 'capacity' => 3, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'ADMIN-03', 'room_type' => 'admin_office', 'capacity' => 2, 'status' => 'available', 'current_occupants' => 0],
            
            // Medical Records Department
            ['room_number' => 'MR-01', 'room_type' => 'medical_records', 'capacity' => 8, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'MR-02', 'room_type' => 'medical_records', 'capacity' => 4, 'status' => 'available', 'current_occupants' => 0],
            
            // Billing Department
            ['room_number' => 'BILL-01', 'room_type' => 'billing_dept', 'capacity' => 6, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'BILL-02', 'room_type' => 'billing_dept', 'capacity' => 4, 'status' => 'available', 'current_occupants' => 0],
            
            // IT Department
            ['room_number' => 'IT-01', 'room_type' => 'it_dept', 'capacity' => 5, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'IT-02', 'room_type' => 'it_dept', 'capacity' => 3, 'status' => 'available', 'current_occupants' => 0],
            
            // ========== OTHER SUPPORT ROOMS ==========
            // Nurse Stations
            ['room_number' => 'NS-1F', 'room_type' => 'nurse_station', 'capacity' => 4, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'NS-2F', 'room_type' => 'nurse_station', 'capacity' => 4, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'NS-3F', 'room_type' => 'nurse_station', 'capacity' => 4, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'NS-4F', 'room_type' => 'nurse_station', 'capacity' => 4, 'status' => 'available', 'current_occupants' => 0],
            
            // Doctor Offices
            ['room_number' => 'DOC-01', 'room_type' => 'doctor_office', 'capacity' => 2, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'DOC-02', 'room_type' => 'doctor_office', 'capacity' => 2, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'DOC-03', 'room_type' => 'doctor_office', 'capacity' => 2, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'DOC-04', 'room_type' => 'doctor_office', 'capacity' => 2, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'DOC-05', 'room_type' => 'doctor_office', 'capacity' => 2, 'status' => 'available', 'current_occupants' => 0],
            
            // Waiting Rooms
            ['room_number' => 'WAIT-1F', 'room_type' => 'waiting_room', 'capacity' => 30, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'WAIT-2F', 'room_type' => 'waiting_room', 'capacity' => 25, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'WAIT-ER', 'room_type' => 'waiting_room', 'capacity' => 40, 'status' => 'available', 'current_occupants' => 0],
            ['room_number' => 'WAIT-OPD', 'room_type' => 'waiting_room', 'capacity' => 50, 'status' => 'available', 'current_occupants' => 0],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
