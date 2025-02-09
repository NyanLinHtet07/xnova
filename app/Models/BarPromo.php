<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BarData;

class BarPromo extends Model
{
    protected $fillable = [
        'bar_id',
        'image',
        'description',
        'start_promo',
        'end_promo',
        'is_active',
        'is_cover'
    ];

    public function bar()
    {
        return $this->belongsTo(BarData::class, 'bar_id', 'id');
    }
}
