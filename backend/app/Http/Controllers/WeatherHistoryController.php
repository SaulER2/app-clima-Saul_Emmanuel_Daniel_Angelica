<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WeatherHistory;

class WeatherHistoryController extends Controller
{
    /**
     * GET /weather/history
     * Retorna el historial del usuario autenticado o todo el historial (según diseño)
     */
    public function index(Request $request)
    {
        // Si quieres que cada usuario solo vea su historial,
        // agrega un campo user_id en la tabla y filtra así:
        // $history = WeatherHistory::where('user_id', auth()->id())->latest()->get();

        $history = WeatherHistory::orderBy('queried_at', 'desc')->get();

        return response()->json([
            'count' => $history->count(),
            'data'  => $history
        ]);
    }

    /**
     * GET /weather/history/search?lat=&lon=
     * Busca historial basado en coordenadas exactas.
     */
    public function findByCoords(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
        ]);

        $lat = $request->lat;
        $lon = $request->lon;

        $history = WeatherHistory::where('lat', $lat)
            ->where('lon', $lon)
            ->orderBy('queried_at', 'desc')
            ->get();

        return response()->json([
            'lat'   => $lat,
            'lon'   => $lon,
            'count' => $history->count(),
            'data'  => $history
        ]);
    }

    /**
     * DELETE /weather/history
     * Limpia todo el historial del sistema (o del usuario si así lo decides).
     */
    public function clear(Request $request)
    {
        // Para borrado por usuario autenticado:
        // WeatherHistory::where('user_id', auth()->id())->delete();

        WeatherHistory::truncate();

        return response()->json([
            'message' => 'Historial eliminado correctamente.'
        ]);
    }
}