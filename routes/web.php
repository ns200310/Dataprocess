<?php

use App\Http\Controllers\DistelleryInfoController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'dashboard')->name('home');
Route::get('/map',[DistelleryInfoController::class, 'index'])->name('map-page');
Route::post('/map/refresh',[DistelleryInfoController::class, 'fetchData'])->name('map-page-refresh');
