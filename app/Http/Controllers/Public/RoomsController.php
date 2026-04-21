<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Room;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class RoomsController extends Controller
{
    /** Каталог /rooms */
    public function index(): Response
    {
        return Inertia::render('Rooms/Index', [
            'page' => Page::forSlug('rooms'),
            'rooms' => Cache::rememberForever('rooms.all', fn () => Room::active()->get()->values()->toArray()),
        ]);
    }

    /** Страница одного номера /rooms/{slug} */
    public function show(Room $room): Response
    {
        abort_unless($room->is_active, 404);
        $room->load('amenities', 'photos');

        $similar = Cache::remember("rooms.similar.{$room->id}", 3600, function () use ($room) {
            return Room::active()
                ->where('id', '!=', $room->id)
                ->orderByRaw('ABS(CAST(area_m2 AS SIGNED) - ?)', [$room->area_m2])
                ->take(3)->get()->values()->toArray();
        });

        return Inertia::render('Rooms/Show', [
            'page' => Page::forSlug('rooms'),
            'room' => $room->toArray() + ['amenities' => $room->amenities->toArray(), 'photos' => $room->photos->toArray()],
            'similarRooms' => $similar,
        ]);
    }
}
