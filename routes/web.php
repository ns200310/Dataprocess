<?php

use App\Http\Controllers\DistelleryInfoController;
use App\Http\Controllers\AuctionsController;
use Illuminate\Support\Facades\Route;

Route::get('/map',[DistelleryInfoController::class, 'index'])->name('map-page');
Route::post('/map/refresh',[DistelleryInfoController::class, 'fetchData'])->name('map-page-refresh');

Route::get('/',[AuctionsController::class, 'index'])->name('auctions-page');
Route::get('/{slug}', [AuctionsController::class, 'data'])->name('auctions-data-page');