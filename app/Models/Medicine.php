<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    protected $fillable = [
        'name',
        'category',
        'quantity',
        'unit',
        'expiry_date',
        'supplier',
    ];

    protected $casts = [
        'expiry_date' => 'date',
    ];
}
