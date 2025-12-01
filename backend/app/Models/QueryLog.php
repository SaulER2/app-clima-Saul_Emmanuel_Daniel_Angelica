<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QueryLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'source',
        'status_code',
        'response_time'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}