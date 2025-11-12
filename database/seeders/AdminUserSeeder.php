<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Patient;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('Admin2025'),
            'role' => 'admin',
        ]);

        // Create Patient record for admin
        Patient::create([
            'user_id' => $admin->id,
            'full_name' => 'Administrator',
            'address' => 'Bulalacao, Oriental Mindoro',
            'phone_number' => '09123456789',
            'gender' => 'male',
            'ip_status' => 'no',
            'tribe' => null,
            'medical_condition' => 'N/A - System Administrator',
        ]);

        $this->command->info('Admin user created successfully!');
        $this->command->info('Email: admin@gmail.com');
        $this->command->info('Password: Admin2025');
    }
}
