<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->boolean('is_indigenous_people')->default(false)->after('medical_status');
            $table->string('tribe')->nullable()->after('is_indigenous_people');
        });
    }

    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn(['is_indigenous_people', 'tribe']);
        });
    }
};
