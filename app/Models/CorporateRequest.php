<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * CorporateRequest — заявка на корпоративный тариф от компании
 * с регулярными командировками в Самару. Ведёт к /corporate и
 * к форме на главной.
 */
class CorporateRequest extends Model
{
    protected $fillable = [
        'name', 'company', 'phone', 'email',
        'estimated_nights_per_year', 'comment', 'source',
        'status', 'admin_notes', 'ip', 'user_agent',
    ];

    protected $casts = [
        'estimated_nights_per_year' => 'integer',
    ];

    public const STATUSES = [
        'new' => 'Новая',
        'contacted' => 'Связались',
        'signed' => 'Подписан договор',
        'declined' => 'Отказ',
    ];
}
