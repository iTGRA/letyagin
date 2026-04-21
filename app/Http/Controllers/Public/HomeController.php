<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\GalleryItem;
use App\Models\HeroSlide;
use App\Models\HistoryMilestone;
use App\Models\NearbyPlace;
use App\Models\Page;
use App\Models\RestaurantMenuItem;
use App\Models\Review;
use App\Models\Room;
use App\Models\RoomAmenity;
use App\Models\Service;
use App\Models\TeamMember;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

/**
 * HomeController — одностраничная главная с 16 блоками по CONTENT.md §2.
 * Все данные через Inertia props. Коллекции кэшируются, автоматически
 * флашатся через CacheCleaner observer.
 */
class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Home', [
            'page' => Page::forSlug(''),
            'heroSlides'         => Cache::rememberForever('hero.slides',      fn () => HeroSlide::active()->get()->values()->toArray()),
            'featuredRooms'      => Cache::rememberForever('rooms.featured',   fn () => Room::featured()->take(5)->get(['id', 'slug', 'name', 'category', 'area_m2', 'guests', 'short_description', 'hero_image_id', 'features'])->values()->toArray()),
            'services'           => Cache::rememberForever('services.active',  fn () => Service::active()->get()->values()->toArray()),
            'roomAmenities'      => Cache::rememberForever('rooms.amenities',  fn () => RoomAmenity::active()->get()->values()->toArray()),
            'featuredMenuItems'  => Cache::rememberForever('menu.featured',    fn () => RestaurantMenuItem::featured()->take(8)->get()->values()->toArray()),
            'featuredChef'       => Cache::rememberForever('team.active',      fn () => optional(TeamMember::featured()->first())->toArray()),
            'nearbyPreview'      => Cache::rememberForever('nearby.preview',   fn () => NearbyPlace::active()->take(6)->get()->values()->toArray()),
            'historyPreview'     => Cache::rememberForever('history.active',   fn () => HistoryMilestone::active()->get()->values()->toArray()),
            'galleryPreview'     => Cache::rememberForever('gallery.active',   fn () => GalleryItem::active()->take(12)->get()->values()->toArray()),
            'featuredReviews'    => Cache::rememberForever('reviews.featured', fn () => Review::featured()->take(4)->get()->values()->toArray()),
            'faqs'               => Cache::rememberForever('faqs.active',      fn () => Faq::active()->get()->values()->toArray()),
        ]);
    }
}
