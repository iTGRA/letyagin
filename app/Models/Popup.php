<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use Orchid\Screen\AsSource;

/**
 * Popup — модальное окно. SINGLETON: редактируем запись с id=1.
 * Логика показа (trigger / frequency) — на клиенте через cookie.
 */
class Popup extends Model
{
    use Attachable;
    use AsSource;

    public const SINGLETON_ID = 1;

    protected $fillable = [
        'is_enabled', 'title', 'body', 'image_id',
        'cta_text', 'cta_url', 'trigger_type', 'delay_seconds',
        'frequency', 'date_from', 'date_to',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
        'delay_seconds' => 'integer',
        'date_from' => 'datetime',
        'date_to' => 'datetime',
    ];

    public const TRIGGERS = [
        'on_load' => 'При загрузке',
        'on_exit' => 'На уход (exit-intent)',
        'on_scroll_50' => 'После 50% прокрутки',
    ];

    public const FREQUENCIES = [
        'every_visit' => 'Каждый визит',
        'once_per_session' => 'Раз за сессию',
        'once_per_user' => 'Один раз на гостя',
    ];

    public static function singleton(): self
    {
        return self::firstOrNew(['id' => self::SINGLETON_ID]);
    }

    public function isLive(): bool
    {
        if (! $this->is_enabled || ! $this->title) {
            return false;
        }

        $now = now();
        if ($this->date_from && $now->lt($this->date_from)) {
            return false;
        }
        if ($this->date_to && $now->gt($this->date_to)) {
            return false;
        }

        return true;
    }
}
