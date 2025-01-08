<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BarData;

class BarMenu extends Model
{
    protected $fillable = [
        'bar_id',
        'title',
        'menus'
    ];

    public function bar()
    {
        return $this->belongsTo(BarData::class, 'bar_id', 'id');
    }


}
