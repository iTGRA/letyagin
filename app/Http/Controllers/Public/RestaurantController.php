<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\RestaurantMenuItem;
use App\Models\TeamMember;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class RestaurantController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Restaurant', [
            'page' => Page::forSlug('restaurant'),
            'chef' => Cache::rememberForever('team.featured', fn () => optional(TeamMember::featured()->first())->toArray()),
            'menuHeadliners' => Cache::rememberForever('menu.featured', fn () => RestaurantMenuItem::featured()->take(8)->get()->values()->toArray()),
            'menuByCategory' => Cache::rememberForever('menu.by_category', function () {
                return RestaurantMenuItem::available()->get()->groupBy('category')->map->values()->map->toArray()->toArray();
            }),
        ]);
    }
}
