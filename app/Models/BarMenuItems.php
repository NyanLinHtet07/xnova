<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BarMenu;

class BarMenuItems extends Model
{
    protected $fillable = [
        'menu_id',
        'name',
        'price',
        'image'
    ];

    public function menu()
    {
        return $this->belongsTo(BarMenu::class, 'menu_id');
    }


}
