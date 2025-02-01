<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BarData;

class BarImageGallery extends Model
{
    protected $fillable = [
        'bar_id',
        'image'
    ];

   
    public function BarData()
    {
        return $this->belongsTo(BarData::class, 'bar_id');
    }
}
