<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Distillery extends Model
{
    protected $fillable = [
        'search_name', 
        'display_name',
        'latitude',
        'longitude',
        'country'
    ];
}
