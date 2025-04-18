<?php

namespace App\Models;
use App\Models\User;
use App\Models\BarMenu;
use App\Models\Category;
use App\Models\BarImageGallery;
use App\Models\BarPromo;
use App\Models\Review;
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
        'contact',
        'amenities'
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

    public function promos()
    {
        return $this->hasMany(BarPromo::class, 'bar_id', 'id');
    }


    public function reviews()
    {
        return $this->hasMany(Review::class, 'bar_id');
    }

    public function getAverageRatingAttribute()
    {
        return round($this->reviews()->avg('rating'), 1);
    }
    }
