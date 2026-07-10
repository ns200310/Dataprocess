<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Http\Controllers\AuctionsController;
use App\Http\Controllers\DistelleryInfoController;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::call([AuctionsController::class, 'fetchInfoData'])->daily();
Schedule::call([DistelleryInfoController::class, 'fetchData'])->daily();
