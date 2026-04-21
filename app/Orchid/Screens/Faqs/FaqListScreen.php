<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Faqs;

use App\Models\Faq;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class FaqListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'faqs' => Faq::query()->orderBy('sort_order')->paginate(50),
        ];
    }

    public function name(): ?string
    {
        return 'Вопросы и ответы';
    }

    public function description(): ?string
    {
        return 'FAQ-блок: заезд, выезд, парковка, дети, тихие номера.';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Новый вопрос')
                ->icon('bs.plus-circle')
                ->route('platform.faqs.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('faqs', [
                TD::make('sort_order', '№')->width('60px')->sort(),
                TD::make('question', 'Вопрос')
                    ->render(fn (Faq $f) => Link::make($f->question)
                        ->route('platform.faqs.edit', $f)),
                TD::make('is_active', 'Опубликован')->width('140px')
                    ->render(fn (Faq $f) => $f->is_active ? '✓' : '—'),
                TD::make('updated_at', 'Изменён')->width('140px')
                    ->render(fn (Faq $f) => $f->updated_at?->diffForHumans()),
            ]),
        ];
    }
}
