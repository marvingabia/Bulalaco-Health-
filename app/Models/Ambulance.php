<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ambulance extends Model
{
    protected $fillable = [
        'vehicle_number',
        'driver_name',
        'driver_phone',
        'status',
        'last_maintenance',
    ];

    protected $casts = [
        'last_maintenance' => 'date',
    ];
}
