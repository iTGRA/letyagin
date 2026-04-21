<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;
use Illuminate\Support\Facades\Cache;

/**
 * SiteSetting — key/value store для всех singular-настроек сайта.
 *
 * Используется для: контакты, соцсети, карты, код Метрики, промокод,
 * получатели email, интеграция Контур.Отеля, прочие конфиги.
 *
 * Helper:  SiteSetting::get('phone', '+7 000')
 * Кэш:     1 час, флаш на saved/deleted через CacheCleaner observer.
 */
class SiteSetting extends Model
{
    
    use AsSource;public const CACHE_KEY = 'site.settings.all';
    public const CACHE_TTL = 3600;

    protected $fillable = [
        'key', 'value', 'group', 'label', 'hint', 'type', 'sort_order',
    ];

    /** Получить значение настройки с кэшем. */
    public static function get(string $key, mixed $default = null): mixed
    {
        return self::all()[$key] ?? $default;
    }

    /** Установить значение (создаёт запись если нет). */
    public static function set(string $key, mixed $value): self
    {
        $setting = self::firstOrNew(['key' => $key]);
        $setting->value = (string) $value;
        $setting->save();

        return $setting;
    }

    /** Все настройки как key => value. Кэшируется. */
    public static function all($columns = ['*']): array
    {
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            return static::query()->pluck('value', 'key')->toArray();
        });
    }

    /** Очистить кэш (вызывается из observer'а). */
    public static function flushCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
