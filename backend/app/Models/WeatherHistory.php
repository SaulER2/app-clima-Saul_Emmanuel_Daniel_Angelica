<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WeatherHistory extends Model
{
    use HasFactory;

    protected $table = 'weather_history';

    protected $fillable = [
        'lat',
        'lon',
        'city_name',
        'response',
        'queried_at',
    ];

    protected $casts = [
        'response'   => 'json',
        'queried_at' => 'datetime',
    ];
}
