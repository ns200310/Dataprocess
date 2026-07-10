<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('auction_data', function (Blueprint $table) {
            $table->id();
            $table->date('dt');
            $table->text('auction_name')->nullable(); 
            $table->text('auction_slug')->nullable();           
            $table->decimal('winning_bid_mean')->nullable();
            $table->integer('auction_trading_volume')->nullable();
            $table->integer('auction_lots_count')->nullable();
            $table->integer('all_auctions_lots_count')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auction_data');
    }
};
