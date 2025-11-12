<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ambulances', function (Blueprint $table) {
            $table->id();
            $table->string('vehicle_number')->unique();
            $table->string('driver_name');
            $table->string('driver_phone');
            $table->enum('status', ['available', 'on-call', 'maintenance'])->default('available');
            $table->date('last_maintenance');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ambulances');
    }
};
