<?php

namespace App\Models;
use App\Models\User;
use App\Models\BarMenu;

use Illuminate\Database\Eloquent\Model;

class BarData extends Model
{
    protected $fillable = [
        'name',
        'owner_id',
        'images',
        'opening_time',
        'description',
        'location_lat',
        'location_long',
    ];

    protected $casts = [
        'images' => 'array',
    ];

 
    public function owner()
    {
     
            return $this->belongsTo(User::class, 'foreign_key', 'other_key');
        }

  
    public function menus()
    {
        return $this->hasMany(BarMenu::class, 'bar_id', 'id');
    }
    }
