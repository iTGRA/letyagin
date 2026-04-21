<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Requests;

use App\Models\EventRequest;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class EventRequestListScreen extends Screen
{
    public function query(): iterable
    {
        return ['requests' => EventRequest::query()->latest()->paginate(50)];
    }

    public function name(): ?string { return 'Заявки — мероприятия (ЛетягинЪ-Холл)'; }

    public function layout(): iterable
    {
        return [
            Layout::table('requests', [
                TD::make('id', '#')->width('60px'),
                TD::make('created_at', 'Получено')->width('160px')
                    ->render(fn (EventRequest $r) => $r->created_at?->format('d.m.Y H:i')),
                TD::make('name', 'Контакт')
                    ->render(fn (EventRequest $r) => Link::make($r->name)->route('platform.requests.event.edit', $r)),
                TD::make('phone', 'Телефон'),
                TD::make('event_type', 'Тип')->width('120px')
                    ->render(fn (EventRequest $r) => EventRequest::EVENT_TYPES[$r->event_type] ?? $r->event_type),
                TD::make('event_date', 'Дата события')->width('120px')
                    ->render(fn (EventRequest $r) => $r->event_date?->format('d.m.Y')),
                TD::make('guests_count', 'Гостей')->width('80px'),
                TD::make('status', 'Статус')->width('120px')
                    ->render(fn (EventRequest $r) => EventRequest::STATUSES[$r->status] ?? $r->status),
            ]),
        ];
    }
}
