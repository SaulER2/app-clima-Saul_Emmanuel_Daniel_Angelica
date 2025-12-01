<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weather_history', function (Blueprint $table) {
            $table->id();

            // Coordenadas de la consulta
            $table->decimal('lat', 10, 6);
            $table->decimal('lon', 10, 6);

            // Nombre de la ciudad si está disponible
            $table->string('city_name')->nullable();

            // JSON COMPLETO retornado por la API /forecast
            $table->json('response');

            // Momento en el que se consultó (útil para debug y auditoría)
            $table->timestamp('queried_at')->useCurrent();

            $table->timestamps();

            // Índices recomendados
            $table->index(['lat', 'lon']);
            $table->index('queried_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weather_history');
    }
};
