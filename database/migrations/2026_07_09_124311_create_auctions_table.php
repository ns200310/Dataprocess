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
        Schema::create('auctions', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('base_currency')->nullable();
            $table->decimal('listing_fee')->nullable();
            $table->decimal('buyers_fee')->nullable();
            $table->decimal('reserve_fee')->nullable();
            $table->decimal('sellers_fee')->nullable();
            $table->text('slug')->nullable();
            $table->text('url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auctions');
    }
};
