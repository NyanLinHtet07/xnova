<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class helpRequest extends Model
{
    protected $fillable = [
        'name',
        'count',
        'needs',
        'phone',
        'status',
        'latitude',
        'longitude',
    ];
}
