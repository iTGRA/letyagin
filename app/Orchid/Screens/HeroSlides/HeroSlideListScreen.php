<?php

declare(strict_types=1);

namespace App\Orchid\Screens\HeroSlides;

use App\Models\HeroSlide;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class HeroSlideListScreen extends Screen
{
    public function query(): iterable
    {
        return ['slides' => HeroSlide::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Hero-слайды'; }
    public function description(): ?string { return 'Слайдер на главной. 4-5 слайдов максимум.'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новый слайд')->icon('bs.plus-circle')->route('platform.hero-slides.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('slides', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('title', 'Подпись')
                    ->render(fn (HeroSlide $s) => Link::make($s->title ?: 'Без подписи')->route('platform.hero-slides.edit', $s)),
                TD::make('video_url', 'Видео')->render(fn (HeroSlide $s) => $s->video_url ? '▶' : '—'),
                TD::make('is_active', 'Активен')->width('100px')
                    ->render(fn (HeroSlide $s) => $s->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
