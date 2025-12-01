<?php

namespace App\Services;

use App\Models\QueryLog;

class QueryLoggerService
{
    public function log(
        ?int $userId,
        float $lat,
        float $lon,
        string $source,
        int $statusCode,
        float $responseTime = null
    ): void
    {
        QueryLog::create([
            'user_id'       => $userId,
            'latitude'      => $lat,
            'longitude'     => $lon,
            'source'        => $source,
            'status_code'   => $statusCode,
            'response_time' => $responseTime,
        ]);
    }
}