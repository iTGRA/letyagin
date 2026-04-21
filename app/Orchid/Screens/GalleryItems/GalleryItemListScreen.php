<?php

declare(strict_types=1);

namespace App\Orchid\Screens\GalleryItems;

use App\Models\GalleryItem;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class GalleryItemListScreen extends Screen
{
    public function query(): iterable
    {
        return ['items' => GalleryItem::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Галерея деталей'; }
    public function description(): ?string { return 'Крупные кадры фактур (кирпич, интерьер, ткани).'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новое фото')->icon('bs.plus-circle')->route('platform.gallery.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('items', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('alt_text', 'Alt-текст')
                    ->render(fn (GalleryItem $g) => Link::make($g->alt_text)->route('platform.gallery.edit', $g)),
                TD::make('category', 'Категория')
                    ->render(fn (GalleryItem $g) => GalleryItem::CATEGORIES[$g->category] ?? '—'),
                TD::make('aspect', 'Аспект')
                    ->render(fn (GalleryItem $g) => GalleryItem::ASPECTS[$g->aspect] ?? $g->aspect),
                TD::make('is_active', 'Активно')->width('100px')
                    ->render(fn (GalleryItem $g) => $g->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
