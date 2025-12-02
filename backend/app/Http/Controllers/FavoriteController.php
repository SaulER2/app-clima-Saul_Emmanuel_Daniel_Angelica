<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->favorites()->get();
    }

    public function store(Request $request)
    {
        error_log('Agregando favorito para usuario ' . $request->user()->id);

        $validator = Validator::make($request->all(), [
            'longitude' => 'required|numeric',
            'name'      => 'required|string',
            'latitude'  => 'required|numeric',
        ]);

        // Comprobar si hay errores de validación
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // 🔥 Verificar si ya existe este favorito para el usuario
        $exists = Favorite::where('user_id', $request->user()->id)
            ->where('name', $data['name'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Esta ciudad ya se encuentra en tus favoritos.'
            ], 409); // 409 Conflict
        }

        // Crear favorito
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