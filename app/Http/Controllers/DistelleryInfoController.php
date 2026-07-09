<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Config;
use App\Models\Distillery;

use App\Jobs\FetchDistilleryLocation;


class DistelleryInfoController extends Controller
{
    public function index() {
        
        $data = Distillery::whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get();

        return Inertia::render('MapPage', ['data' => $data]);
    }

    public function fetchData() : JsonResponse {
        try {
            $url = config('app.external_api');
        
        $response = Http::get($url.'distilleries_info/')->json();

        $delay = 0;

        foreach ($response as $key => $value) {
            $distilName = $value['name'];
            $distilCountry = $value['country'];


            FetchDistilleryLocation::dispatch($distilName, $distilCountry)
            ->delay(
                now()->addSeconds($delay)
            );

            $delay++;

        }

        $responseData = [
            'message' => 'Data refreshed successfully',
            'status' => 'success'
        ];

        $response = response()->json($responseData);
        } catch (Exception $e) {
            Log::error('Error fetch data:'.$e->getMessage());

        $responseData = [
            'message' => 'Data refreshed failed',
            'status' => 'error'
        ];

        $response = response()->json($responseData, 500);

        }

        return $response;
    }


}
