<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    protected $service;

    public function __construct(WeatherService $service)
    {
        $this->service = $service;
    }

    public function forecast(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
        ]);

        return response()->json(
            $this->service->getForecast(
                $request->lat,
                $request->lon
            )
        );
    }
}
