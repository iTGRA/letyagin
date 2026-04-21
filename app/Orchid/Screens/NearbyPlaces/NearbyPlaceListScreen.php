<?php

declare(strict_types=1);

namespace App\Orchid\Screens\NearbyPlaces;

use App\Models\NearbyPlace;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class NearbyPlaceListScreen extends Screen
{
    public function query(): iterable
    {
        return ['places' => NearbyPlace::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Места рядом'; }
    public function description(): ?string { return 'Путеводитель по центру Самары для /nearby и блока на главной.'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новое место')->icon('bs.plus-circle')->route('platform.nearby-places.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('places', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('name', 'Название')
                    ->render(fn (NearbyPlace $p) => Link::make($p->name)->route('platform.nearby-places.edit', $p)),
                TD::make('category', 'Категория')->width('120px')
                    ->render(fn (NearbyPlace $p) => NearbyPlace::CATEGORIES[$p->category] ?? '—'),
                TD::make('distance_m', 'Расстояние')->width('120px')
                    ->render(fn (NearbyPlace $p) => $p->distance_m ? "{$p->distance_m} м" : '—'),
                TD::make('walk_minutes', 'Пешком')->width('100px')
                    ->render(fn (NearbyPlace $p) => $p->walk_minutes ? "{$p->walk_minutes} мин" : '—'),
                TD::make('is_active', 'Активно')->width('80px')
                    ->render(fn (NearbyPlace $p) => $p->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
