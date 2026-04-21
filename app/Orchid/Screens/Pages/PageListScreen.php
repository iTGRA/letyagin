<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Pages;

use App\Models\Page;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class PageListScreen extends Screen
{
    public function query(): iterable
    {
        return ['pages' => Page::query()->paginate(50)];
    }

    public function name(): ?string { return 'Страницы сайта (SEO)'; }
    public function description(): ?string { return 'SEO-мета и подзаголовки для каждого URL.'; }

    public function commandBar(): iterable
    {
        return [];  // страницы фиксированы (D2), нельзя создавать новые
    }

    public function layout(): iterable
    {
        return [
            Layout::table('pages', [
                TD::make('slug', 'Адрес')->width('200px')
                    ->render(fn (Page $p) => Link::make('/' . $p->slug)->route('platform.pages.edit', $p)),
                TD::make('h1', 'H1'),
                TD::make('schema_type', 'Тип schema.org')->width('160px'),
                TD::make('is_active', 'Активна')->width('100px')
                    ->render(fn (Page $p) => $p->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
