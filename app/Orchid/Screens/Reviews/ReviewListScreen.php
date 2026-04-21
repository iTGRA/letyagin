<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Reviews;

use App\Models\Review;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class ReviewListScreen extends Screen
{
    public function query(): iterable
    {
        return ['reviews' => Review::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Отзывы гостей'; }
    public function description(): ?string { return 'Цитаты с Яндекса, 2ГИС, Островка или добавленные вручную.'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новый отзыв')->icon('bs.plus-circle')->route('platform.reviews.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('reviews', [
                TD::make('author_name', 'Автор')
                    ->render(fn (Review $r) => Link::make($r->author_name)->route('platform.reviews.edit', $r)),
                TD::make('source', 'Источник')->width('100px')
                    ->render(fn (Review $r) => Review::SOURCES[$r->source] ?? $r->source),
                TD::make('rating', 'Оценка')->width('80px'),
                TD::make('topic', 'Тематика')->width('120px')
                    ->render(fn (Review $r) => Review::TOPICS[$r->topic] ?? '—'),
                TD::make('posted_at', 'Дата')->width('100px')
                    ->render(fn (Review $r) => $r->posted_at?->format('d.m.Y')),
                TD::make('is_featured', 'В избранных')->width('120px')
                    ->render(fn (Review $r) => $r->is_featured ? '★' : '—'),
                TD::make('is_active', 'Опубл.')->width('80px')
                    ->render(fn (Review $r) => $r->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
