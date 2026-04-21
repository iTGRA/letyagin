<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Requests;

use App\Models\CorporateRequest;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class CorporateRequestListScreen extends Screen
{
    public function query(): iterable
    {
        return ['requests' => CorporateRequest::query()->latest()->paginate(50)];
    }

    public function name(): ?string { return 'Заявки — корп-тариф'; }

    public function layout(): iterable
    {
        return [
            Layout::table('requests', [
                TD::make('id', '#')->width('60px'),
                TD::make('created_at', 'Получено')->width('160px')
                    ->render(fn (CorporateRequest $r) => $r->created_at?->format('d.m.Y H:i')),
                TD::make('company', 'Компания')
                    ->render(fn (CorporateRequest $r) => Link::make($r->company)->route('platform.requests.corporate.edit', $r)),
                TD::make('name', 'Контакт'),
                TD::make('phone', 'Телефон'),
                TD::make('estimated_nights_per_year', 'Ночей/год')->width('120px'),
                TD::make('status', 'Статус')->width('140px')
                    ->render(fn (CorporateRequest $r) => CorporateRequest::STATUSES[$r->status] ?? $r->status),
            ]),
        ];
    }
}
