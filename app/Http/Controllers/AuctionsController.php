<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use App\Models\Auctions;
use App\Models\AuctionData;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AuctionsController extends Controller
{
    public function fetchInfoData()
    {
        try {
            $url = config("app.external_api");

            $constructedUrl = $url . "auctions_info";

            $apiCall = Http::get($constructedUrl);

            $response = $apiCall->json();

            foreach ($response as $key => $value) {
                $record = Auctions::updateOrCreate(
                    
                ['slug' => $value['slug']],
                [
                    'name'          => $value['name'],
                    'url'           => $value['url'] ?? null,
                    'base_currency' => $value['base_currency'] ?? '',
                    'listing_fee'   => $value['listing_fee'] ?? 0,
                    'buyers_fee'    => $value['buyers_fee'] ?? 0,
                    'reserve_fee'   => $value['reserve_fee'] ?? 0,
                    'sellers_fee'   => $value['sellers_fee'] ?? 0,
                ]);
            }

            $responseData = [
                "message" => "Data refreshed successfully",
                "status" => "error",
            ];

            $response = response()->json($responseData);
        } catch (Exception $e) {
            Log::error("Error fetch data:" . $e->getMessage());

            $responseData = [
                "message" => "Data refreshed failed",
                "status" => "error",
            ];

            $response = response()->json($responseData, 500);
        }

        return $response;
    }

public function fetchData($slug)
{
    try {
        $url = config("app.external_api");
        $constructedUrl = $url . "auction_data/" . $slug . "/";
        $apiCall = Http::get($constructedUrl);

        $response = $apiCall->json();

        Log::info("url: " . $constructedUrl);
        Log::info("status: " . $apiCall->status());

        if ($apiCall->successful() && !empty($response)) {
            $records = isset($response['dt']) ? [$response] : $response;

            foreach ($records as $record) {
                if (!isset($record['dt']) or !isset($record['auction_slug'])) {
                    continue;
                }

                AuctionData::updateOrCreate(
                    [
                        'dt'=> $record['dt'],
                        'auction_slug' => $record['auction_slug']
                    ],
                    [
                        'auction_name'=> $record['auction_name'] ?? '',
                        'winning_bid_mean'=> $record['winning_bid_mean'] ?? null,
                        'auction_trading_volume'=> $record['auction_trading_volume'] ?? null,
                        'auction_lots_count'=> $record['auction_lots_count'] ?? null,
                        'all_auctions_lots_count' => $record['all_auctions_lots_count'] ?? null,
                    ]
                );
            }
        }

        return AuctionData::where('auction_slug', $slug)
            ->orderBy('dt', 'asc')
            ->get()
            ->toArray();

    } catch (Exception $e) {
        Log::error("Error: " . $e->getMessage());

        return response()->json([
            "message" => "Data refresh failed",
            "status" => "error",
        ], 500);
    }
}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Auctions::all();

        return Inertia::render("AuctionsPage", ["data" => $data]);
    }

    public function data(string $slug)
    {
        // $data = Auctions::whereNotNull('latitude')
        //     ->whereNotNull('longitude')
        //     ->get();

        $data = $this->fetchData($slug);

        return Inertia::render("AuctionsDataPage", ["data" => $data]);
    }
}
