<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'dashboard')->name('home');
Route::inertia('/map', 'MapPage')->name('map-page');
