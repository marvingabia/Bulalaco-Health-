<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table = 'staff';
    
    protected $fillable = [
        'name',
        'email',
        'position',
        'department',
        'phone_number',
        'address',
        'age',
        'status',
        'assigned_room',
        'user_id',
    ];

    /**
     * Get the user account associated with the staff.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
