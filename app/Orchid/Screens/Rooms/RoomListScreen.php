<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Rooms;

use App\Models\Room;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class RoomListScreen extends Screen
{
    public function query(): iterable
    {
        return ['rooms' => Room::query()->with('amenities')->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Номера'; }
    public function description(): ?string { return '19 номеров отеля. Каждый — свой URL /rooms/{slug}.'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новый номер')->icon('bs.plus-circle')->route('platform.rooms.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('rooms', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('name', 'Название')
                    ->render(fn (Room $r) => Link::make($r->name)->route('platform.rooms.edit', $r)),
                TD::make('category', 'Категория')->width('160px')
                    ->render(fn (Room $r) => Room::CATEGORIES[$r->category] ?? $r->category),
                TD::make('area_m2', 'м²')->width('60px'),
                TD::make('guests', 'Гостей')->width('70px'),
                TD::make('slug', 'URL')->width('160px')->render(fn (Room $r) => "/rooms/{$r->slug}"),
                TD::make('is_featured', 'Герой')->width('70px')
                    ->render(fn (Room $r) => $r->is_featured ? '★' : '—'),
                TD::make('is_active', 'Опубл.')->width('80px')
                    ->render(fn (Room $r) => $r->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
