<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use App\Models\WeatherHistory;

class WeatherService
{
    public function getForecast($lat, $lon)
    {
        $cacheKey = "forecast_{$lat}_{$lon}";

        // 1. Consultar caché (3 horas)
        error_log('Consultando caché para ' . $lat . ', ' . $lon);
        error_log('Clave de caché: ' . $cacheKey);
        error_log('Contenido de caché: ' . Cache::has($cacheKey));
        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        // 2. Llamar a la API oficial de OpenWeather (forecast 5d/3h)
        $response = Http::get('https://api.openweathermap.org/data/2.5/forecast', [
            'lat' => $lat,
            'lon' => $lon,
            'units' => 'metric',
            'lang' => 'es',
            'appid' => env('OPENWEATHER_API_KEY'),
        ]);

        if ($response->failed()) {
            return [
                'error' => true,
                'message' => 'Error al consultar OpenWeather',
                'status' => $response->status()
            ];
        }

        $data = $response->json();

        // 3. Guardar historial en base de datos
        error_log('Guardando historial de clima ' . $lat . ', ' . $lon);
        WeatherHistory::create([
            'lat' => $lat,
            'lon' => $lon,
            'response' => $data,
        ]);

        // 4. Guardar en caché por 3 horas
        Cache::put($cacheKey, $data, now()->addHours(3));

        return $data;
    }
}
