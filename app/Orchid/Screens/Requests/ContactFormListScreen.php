<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Requests;

use App\Models\ContactFormRequest;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class ContactFormListScreen extends Screen
{
    public function query(): iterable
    {
        return ['requests' => ContactFormRequest::query()->latest()->paginate(50)];
    }

    public function name(): ?string { return 'Заявки — обратная связь'; }

    public function layout(): iterable
    {
        return [
            Layout::table('requests', [
                TD::make('id', '#')->width('60px'),
                TD::make('created_at', 'Получено')->width('160px')
                    ->render(fn (ContactFormRequest $r) => $r->created_at?->format('d.m.Y H:i')),
                TD::make('name', 'Гость')
                    ->render(fn (ContactFormRequest $r) => Link::make($r->name)->route('platform.requests.contact.edit', $r)),
                TD::make('phone', 'Телефон'),
                TD::make('email', 'Email'),
                TD::make('status', 'Статус')->width('120px')
                    ->render(fn (ContactFormRequest $r) => ContactFormRequest::STATUSES[$r->status] ?? $r->status),
            ]),
        ];
    }
}
