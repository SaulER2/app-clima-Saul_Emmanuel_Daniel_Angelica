<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redis;
use Illuminate\Http\Request;

class CacheController extends Controller
{
    public function deleteOne(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lon' => 'required|numeric'
        ]);

        $key = "weather:{$request->lat}:{$request->lon}";
        Redis::del($key);

        return response()->json(['message' => 'Cache eliminado']);
    }

    public function clearAll()
    {
        Redis::flushall();
        return response()->json(['message' => 'Cache limpiado']);
    }
}