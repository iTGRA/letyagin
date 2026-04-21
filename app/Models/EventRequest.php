<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * EventRequest — заявка на мероприятие в ЛетягинЪ-Холле
 * (свадьба, банкет, конференция, день рождения, корпоратив).
 */
class EventRequest extends Model
{
    protected $fillable = [
        'name', 'phone', 'email', 'event_type', 'event_date',
        'guests_count', 'comment', 'source', 'status', 'admin_notes',
        'ip', 'user_agent',
    ];

    protected $casts = [
        'event_date' => 'date',
        'guests_count' => 'integer',
    ];

    public const EVENT_TYPES = [
        'wedding' => 'Свадьба',
        'banquet' => 'Банкет',
        'conference' => 'Конференция',
        'birthday' => 'День рождения',
        'corporate' => 'Корпоратив',
        'other' => 'Другое',
    ];

    public const STATUSES = [
        'new' => 'Новая',
        'contacted' => 'Связались',
        'booked' => 'Забронировано',
        'declined' => 'Отказано',
        'cancelled' => 'Отменена',
    ];
}
