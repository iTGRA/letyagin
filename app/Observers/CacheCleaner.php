<?php

namespace App\Observers;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * CacheCleaner — единый observer для всех контентных моделей.
 *
 * На любое изменение/удаление/создание модели чистит соответствующий
 * ключ кэша. Регистрируется в AppServiceProvider::boot() для каждой
 * коллекционной модели отдельно.
 *
 * Принцип: лучше «лишний раз» пересоздать кеш, чем подавать устаревшие
 * данные гостю. Инвалидируем по модели, а не точечно по записи —
 * контента мало, нагрузка невысокая.
 */
class CacheCleaner
{
    /** Карта model-class → массив cache-ключей которые нужно флашить. */
    protected const KEY_MAP = [
        \App\Models\SiteSetting::class      => [SiteSetting::CACHE_KEY, 'inertia.shared'],
        \App\Models\HeroSlide::class        => ['hero.slides', 'inertia.shared'],
        \App\Models\Room::class             => ['rooms.all', 'rooms.featured', 'rooms.by_slug'],
        \App\Models\RoomAmenity::class      => ['rooms.all', 'rooms.amenities'],
        \App\Models\RoomPhoto::class        => ['rooms.all', 'rooms.by_slug'],
        \App\Models\Service::class          => ['services.active'],
        \App\Models\NearbyPlace::class      => ['nearby.all', 'nearby.by_category'],
        \App\Models\RestaurantMenuItem::class => ['menu.available', 'menu.featured'],
        \App\Models\TeamMember::class       => ['team.active'],
        \App\Models\GalleryItem::class      => ['gallery.active'],
        \App\Models\Review::class           => ['reviews.featured', 'reviews.active'],
        \App\Models\Faq::class              => ['faqs.active'],
        \App\Models\HistoryMilestone::class => ['history.active'],
        \App\Models\Announcement::class     => ['announcement.current', 'inertia.shared'],
        \App\Models\Popup::class            => ['popup.current', 'inertia.shared'],
        \App\Models\Page::class             => ['page.by_slug', 'inertia.shared'],
    ];

    public function saved(Model $model): void
    {
        $this->flush($model);
    }

    public function deleted(Model $model): void
    {
        $this->flush($model);
    }

    protected function flush(Model $model): void
    {
        $keys = self::KEY_MAP[get_class($model)] ?? [];
        foreach ($keys as $key) {
            Cache::forget($key);
        }
    }
}
