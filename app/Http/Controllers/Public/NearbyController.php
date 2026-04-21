<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\NearbyPlace;
use App\Models\Page;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class NearbyController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Nearby', [
            'page' => Page::forSlug('nearby'),
            'places' => Cache::rememberForever('nearby.all', fn () => NearbyPlace::active()->get()->values()->toArray()),
            'placesByCategory' => Cache::rememberForever('nearby.by_category', fn () => NearbyPlace::active()->get()->groupBy('category')->map->values()->map->toArray()->toArray()),
        ]);
    }
}
