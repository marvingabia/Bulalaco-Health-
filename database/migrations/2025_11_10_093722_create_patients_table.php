<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->text('address');
            $table->string('phone_number');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->enum('ip_status', ['yes', 'no']);
            $table->string('tribe')->nullable();
            $table->text('medical_condition');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
