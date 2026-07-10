<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use App\Models\Auctions;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AuctionsController extends Controller
{

    public function fetchInfoData() {
        try {
            $url = config('app.external_api');

            $constructedUrl = $url.'auctions_info';
        
            $apiCall = Http::get($constructedUrl);

            $response = $apiCall->json();

            Log::info("status: " . $apiCall->status());
            Log::info("body: " . $apiCall->body());

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


        public function fetchData($slug) {
        try {
            $url = config('app.external_api');

            $constructedUrl = $url.'auction_data/'.$slug.'/';        
            $apiCall = Http::get($constructedUrl);

            $response = $apiCall->json();

        

            Log::info("url: " . $constructedUrl);
            Log::info("status: " . $apiCall->status());
            Log::info("body: " . $apiCall->body());

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
    /**
     * Display a listing of the resource.
     */
    public function index() {
        
        // $data = Auctions::whereNotNull('latitude')
        //     ->whereNotNull('longitude')
        //     ->get();

        $data = $this->fetchInfoData();

        return Inertia::render('AuctionsPage', ['data' => $data]);
    }


    public function data(string $slug) {
        
        // $data = Auctions::whereNotNull('latitude')
        //     ->whereNotNull('longitude')
        //     ->get();

        $data = $this->fetchData($slug);

        return Inertia::render('AuctionsDataPage', ['data' => $data]);
    }




}
