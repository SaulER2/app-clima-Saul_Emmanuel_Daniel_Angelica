<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeatherController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\WeatherHistoryController;

/*
|--------------------------------------------------------------------------
| Rutas públicas
|--------------------------------------------------------------------------
*/

// Registro y login
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

// Consultas de clima sin autenticación (si lo permites)
Route::get('/weather/forecast', [WeatherController::class, 'forecast']);



/*
|--------------------------------------------------------------------------
| Rutas protegidas (requieren token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Usuario autenticado
    Route::get('/auth/me',        [AuthController::class, 'me']);
    Route::post('/auth/logout',   [AuthController::class, 'logout']);

    // Favoritos
    Route::get('/favorites',          [FavoriteController::class, 'index']);
    Route::post('/favorites', function() {
        return response()->json(['message' => 'algo']);
    }         /*[FavoriteController::class, 'store']*/);
    Route::delete('/favorites/{id}',  [FavoriteController::class, 'destroy']);

    // Historial
    Route::get('/weather/history',    [WeatherHistoryController::class, 'index']);
    Route::delete('/weather/history', [WeatherHistoryController::class, 'clear']);

    // Opcional: detalles por coordenadas
    Route::get('/weather/history/search', [WeatherHistoryController::class, 'findByCoords']);

    // Caché
    Route::delete('/weather/cache/clear', [WeatherController::class, 'clearCache']);
});