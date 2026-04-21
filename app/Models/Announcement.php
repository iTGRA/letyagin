<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Announcement — бегущая строка над хедером. SINGLETON: всегда редактируем
 * запись с id=1. В Orchid — экран без списка.
 *
 * Проверка активности учитывает is_enabled + даты from/to (если заданы).
 */
class Announcement extends Model
{
    public const SINGLETON_ID = 1;

    protected $fillable = [
        'is_enabled', 'text', 'link_url', 'link_text',
        'color_variant', 'date_from', 'date_to',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
        'date_from' => 'datetime',
        'date_to' => 'datetime',
    ];

    public const COLOR_VARIANTS = [
        'coral' => 'Coral — friendly',
        'brick' => 'Brick — серьёзный',
        'moss' => 'Moss — ресторан/ивент',
        'ink' => 'Ink — цитата/событие',
    ];

    /** Получить singleton-экземпляр. */
    public static function singleton(): self
    {
        return self::firstOrNew(['id' => self::SINGLETON_ID]);
    }

    /** Активен ли сейчас (учитывая даты). */
    public function isLive(): bool
    {
        if (! $this->is_enabled || ! $this->text) {
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
