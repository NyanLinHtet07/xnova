<?php

namespace App\Models;
use App\Models\User;
use App\Models\BarMenu;
use App\Models\Category;
use App\Models\BarImageGallery;
use Illuminate\Database\Eloquent\Model;

class BarData extends Model
{
    protected $fillable = [
        'name',
        'owner_id',
        'category_id',
        'cover',
        'images',
        'opening_time',
        'description',
        'location_lat',
        'location_long',
        'web',
        'address',
        'contact'
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


    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

  
    public function images()
    {
        return $this->hasMany(BarImageGallery::class, 'bar_id', 'id');
    }
    }
