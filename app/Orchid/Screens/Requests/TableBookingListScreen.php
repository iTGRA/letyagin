<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Requests;

use App\Models\TableBookingRequest;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class TableBookingListScreen extends Screen
{
    public function query(): iterable
    {
        return ['requests' => TableBookingRequest::query()->latest()->paginate(50)];
    }

    public function name(): ?string { return 'Заявки — бронь стола'; }
    public function description(): ?string { return 'Заявки с /restaurant и блока ресторана на главной.'; }

    public function layout(): iterable
    {
        return [
            Layout::table('requests', [
                TD::make('id', '#')->width('60px'),
                TD::make('created_at', 'Получено')->width('160px')
                    ->render(fn (TableBookingRequest $r) => $r->created_at?->format('d.m.Y H:i')),
                TD::make('name', 'Гость')
                    ->render(fn (TableBookingRequest $r) => Link::make($r->name)->route('platform.requests.table-booking.edit', $r)),
                TD::make('phone', 'Телефон'),
                TD::make('desired_date', 'Дата')->width('120px')
                    ->render(fn (TableBookingRequest $r) => $r->desired_date?->format('d.m.Y')),
                TD::make('desired_time', 'Время')->width('80px'),
                TD::make('guests_count', 'Гостей')->width('80px'),
                TD::make('source', 'Откуда')->width('180px'),
                TD::make('status', 'Статус')->width('120px')
                    ->render(fn (TableBookingRequest $r) => TableBookingRequest::STATUSES[$r->status] ?? $r->status),
            ]),
        ];
    }
}
