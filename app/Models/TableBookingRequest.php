<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * TableBookingRequest — заявка на бронь стола в ресторане «Дуся».
 * Поступает с /restaurant + из блока ресторана на главной.
 */
class TableBookingRequest extends Model
{
    protected $fillable = [
        'name', 'phone', 'email', 'desired_date', 'desired_time',
        'guests_count', 'comment', 'source', 'status', 'admin_notes',
        'ip', 'user_agent',
    ];

    protected $casts = [
        'desired_date' => 'date',
        'guests_count' => 'integer',
    ];

    public const STATUSES = [
        'new' => 'Новая',
        'contacted' => 'Связались',
        'confirmed' => 'Подтверждена',
        'cancelled' => 'Отменена',
    ];
}
