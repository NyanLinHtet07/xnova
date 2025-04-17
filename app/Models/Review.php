<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\BarData;

class Review extends Model
{
    protected $fillable = [
        'user_id',
        'bar_id',
        'rating',
        'review'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

 
    public function bar()
    {
        return $this->belongsTo(BarData::class, 'bar_id');
    }
}
