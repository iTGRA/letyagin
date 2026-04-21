<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Services;

use App\Models\Service;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class ServiceListScreen extends Screen
{
    public function query(): iterable
    {
        return ['services' => Service::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Услуги отеля'; }
    public function description(): ?string { return 'Блок «Услуги и удобства» на главной.'; }

    public function commandBar(): iterable
    {
        return [
            Link::make('Новая услуга')->icon('bs.plus-circle')->route('platform.services.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('services', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('name', 'Название')
                    ->render(fn (Service $s) => Link::make($s->name)->route('platform.services.edit', $s)),
                TD::make('description', 'Описание'),
                TD::make('is_active', 'Активна')->width('120px')
                    ->render(fn (Service $s) => $s->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
