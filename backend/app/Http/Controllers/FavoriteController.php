<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->favorites()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'      => 'required|string',
            'latitude'  => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $favorite = $request->user()->favorites()->create($data);

        return response()->json($favorite, 201);
    }

    public function destroy(Request $request, Favorite $favorite)
    {
        if ($favorite->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $favorite->delete();

        return response()->json(['message' => 'Eliminado']);
    }
}