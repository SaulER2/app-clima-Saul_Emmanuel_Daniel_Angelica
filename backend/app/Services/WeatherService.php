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

        // Revisar si la ciudad esta en el historial. De ser asi, obtener sus coordenadas
        $history = WeatherHistory::where('lat', $lat)->where('lon', $lon)->first();

        if ($history) {
            $lat = $history->lat;
            $lon = $history->lon;
        }

        WeatherHistory::create([
            'lat' => $lat,
            'lon' => $lon,
            'city_name' => $data['city']['name'],
            'response' => $data,
        ]);

        // 4. Guardar en caché por 3 horas
        Cache::put($cacheKey, $data, now()->addHours(3));

        return $data;
    }

    public function getPopularCitiesWeather()
    {
        // Get form weather history, most searched cities
        $popularCities = WeatherHistory::select('city_name', 'lat', 'lon')
            ->groupBy('city_name', 'lat', 'lon')
            ->orderByRaw('COUNT(*) DESC')
            ->limit(12)
            ->get();

        $results = [];

        foreach ($popularCities as $city) {
            $results[] = [
                'city' => $city['city_name'],
                'weather' => $this->getForecast($city['lat'], $city['lon']),
            ];
        }

        return $results;
    }
}