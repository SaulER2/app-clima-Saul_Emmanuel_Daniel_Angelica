<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OpenWeatherClient
{
    public function fetchWeather(float $lat, float $lon): array
    {
        $apiKey = config('services.openweather.key');

        $response = Http::timeout(5)->get(
            'https://api.openweathermap.org/data/2.5/weather',
            [
                'lat' => $lat,
                'lon' => $lon,
                'units' => 'metric',
                'appid' => $apiKey
            ]
        );

        if ($response->failed()) {
            throw new \Exception('Error al obtener datos del clima');
        }

        return $response->json();
    }
}