<?php

declare(strict_types=1);

namespace App\Orchid\Screens\RoomAmenities;

use App\Models\RoomAmenity;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class RoomAmenityListScreen extends Screen
{
    public function query(): iterable
    {
        return ['amenities' => RoomAmenity::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Удобства в номерах'; }
    public function description(): ?string { return 'Справочник: что можно включить в номер (Wi-Fi, сейф, фен...).'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новое удобство')->icon('bs.plus-circle')->route('platform.room-amenities.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('amenities', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('name', 'Название')
                    ->render(fn (RoomAmenity $a) => Link::make($a->name)->route('platform.room-amenities.edit', $a)),
                TD::make('icon_name', 'Иконка'),
                TD::make('is_active', 'Активно')->width('100px')
                    ->render(fn (RoomAmenity $a) => $a->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
