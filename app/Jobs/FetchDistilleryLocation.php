<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Distillery;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Http;

class FetchDistilleryLocation implements ShouldQueue
{
    use Queueable;

    public $delayInSec = 3; 

    


    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $distilleryName,
        public string $country
    )
    {
        
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if (isset($this->distilleryName)) {

            $url = config('app.external_map_api');
            
            $response = Http::get($url, [
                'q' => $this->distilleryName,
                'format'=>'json',
                'limit'=>'1'
            ]);


            Log::info("status: " . $response->status());
            Log::info("body: " . $response->body());

            $data = $response->json();
            $name = $data[0]['display_name'] ?? $this->distilleryName;
            $lat = $data[0]['lat'] ?? null;
            $long = $data[0]['lon'] ?? null;

            Distillery::updateOrCreate(
                ['search_name' => $this->distilleryName],
                [
                    'display_name' => $name,
                    'latitude' => $lat,
                    'longitude' => $long,
                    'country' => $this->country
                ]
            );

            
        }
        else{
            Log::error('Query name doesnt get setted up');
        }
    }
}
