<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BarData;
use App\Models\BarMenuItems;

class BarMenu extends Model
{
    protected $fillable = [
        'bar_id',
        'title',
        'menus'
    ];

    public function bar()
    {
        return $this->belongsTo(BarData::class, 'bar_id');
    }

   
    public function menuitems()
    {
        return $this->hasMany(BarMenuItems::class, 'menu_id', 'id');
    }

    

}
