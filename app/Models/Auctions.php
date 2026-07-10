<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auctions extends Model
{
    protected $fillable = [
    'name',
    'slug',
    'url',
    'base_currency',
    'listing_fee',
    'buyers_fee',
    'reserve_fee',
    'sellers_fee',
    ];
}
