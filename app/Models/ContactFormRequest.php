<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;

/**
 * ContactFormRequest — общая форма обратной связи с /contacts.
 * Валидация: хотя бы одно из phone/email обязательно (на уровне FormRequest).
 */
class ContactFormRequest extends Model
{
    
    use AsSource;protected $fillable = [
        'name', 'phone', 'email', 'message',
        'source', 'status', 'admin_notes', 'ip', 'user_agent',
    ];

    public const STATUSES = [
        'new' => 'Новая',
        'replied' => 'Ответили',
        'closed' => 'Закрыта',
    ];
}
