<?php

namespace App\Providers;

use App\Models;
use App\Observers\CacheCleaner;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Коллекционные модели, которые автоматически инвалидируют кеш
     * при save/delete через общий CacheCleaner observer.
     */
    protected const OBSERVED_MODELS = [
        Models\SiteSetting::class,
        Models\HeroSlide::class,
        Models\Room::class,
        Models\RoomAmenity::class,
        Models\RoomPhoto::class,
        Models\Service::class,
        Models\NearbyPlace::class,
        Models\RestaurantMenuItem::class,
        Models\TeamMember::class,
        Models\GalleryItem::class,
        Models\Review::class,
        Models\Faq::class,
        Models\HistoryMilestone::class,
        Models\Announcement::class,
        Models\Popup::class,
        Models\Page::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        foreach (self::OBSERVED_MODELS as $modelClass) {
            $modelClass::observe(CacheCleaner::class);
        }
    }
}
