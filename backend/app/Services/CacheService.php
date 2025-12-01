<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;

class CacheService
{
    protected int $ttl = 10800; // 3 horas en segundos

    protected function key(float $lat, float $lon): string
    {
        return "weather:{$lat}:{$lon}";
    }

    public function get(float $lat, float $lon): ?array
    {
        $data = Redis::get($this->key($lat, $lon));

        return $data ? json_decode($data, true) : null;
    }

    public function set(float $lat, float $lon, array $value): void
    {
        Redis::setex(
            $this->key($lat, $lon),
            $this->ttl,
            json_encode($value)
        );
    }

    public function delete(float $lat, float $lon): void
    {
        Redis::del($this->key($lat, $lon));
    }
}