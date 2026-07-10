<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuctionData extends Model
{
    protected $fillable = [
    'dt',
    'auction_name',
    'auction_slug',
    'winning_bid_mean',
    'auction_trading_volume',
    'auction_lots_count',
    'all_auctions_lots_count',
    ];
}
