<?php

declare(strict_types=1);

namespace App\Orchid\Screens\RestaurantMenuItems;

use App\Models\RestaurantMenuItem;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class RestaurantMenuItemListScreen extends Screen
{
    public function query(): iterable
    {
        return ['items' => RestaurantMenuItem::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Меню ресторана'; }
    public function description(): ?string { return 'Блюда «Дуси» для превью и страницы ресторана.'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новое блюдо')->icon('bs.plus-circle')->route('platform.menu-items.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('items', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('name', 'Название')
                    ->render(fn (RestaurantMenuItem $m) => Link::make($m->name)->route('platform.menu-items.edit', $m)),
                TD::make('category', 'Категория')->width('130px')
                    ->render(fn (RestaurantMenuItem $m) => RestaurantMenuItem::CATEGORIES[$m->category] ?? $m->category),
                TD::make('price_hint', 'Цена'),
                TD::make('is_featured', 'Показ в превью')->width('120px')
                    ->render(fn (RestaurantMenuItem $m) => $m->is_featured ? '★' : '—'),
                TD::make('is_available', 'В меню')->width('80px')
                    ->render(fn (RestaurantMenuItem $m) => $m->is_available ? '✓' : '—'),
            ]),
        ];
    }
}
