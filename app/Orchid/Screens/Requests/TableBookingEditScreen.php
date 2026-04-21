<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Requests;

use App\Models\TableBookingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class TableBookingEditScreen extends Screen
{
    public ?TableBookingRequest $booking = null;

    public function query(TableBookingRequest $tableBookingRequest): iterable
    {
        return ['booking' => $tableBookingRequest];
    }

    public function name(): ?string { return 'Заявка #' . $this->booking?->id; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить заявку?')->canSee((bool) $this->booking?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('booking.name')->title('Имя')->disabled(),
                Input::make('booking.phone')->title('Телефон')->disabled(),
                Input::make('booking.email')->title('Email')->disabled(),
                Input::make('booking.desired_date')->title('Дата')->disabled(),
                Input::make('booking.desired_time')->title('Время')->disabled(),
                Input::make('booking.guests_count')->title('Гостей')->disabled(),
                TextArea::make('booking.comment')->title('Комментарий гостя')->rows(3)->disabled(),
                Input::make('booking.source')->title('Источник (CTA)')->disabled(),
                Select::make('booking.status')->title('Статус')->options(TableBookingRequest::STATUSES),
                TextArea::make('booking.admin_notes')->title('Заметки админа')->rows(3),
            ]),
        ];
    }

    public function save(Request $request, TableBookingRequest $tableBookingRequest): RedirectResponse
    {
        $data = $request->validate([
            'booking.status' => ['required', 'string', 'in:' . implode(',', array_keys(TableBookingRequest::STATUSES))],
            'booking.admin_notes' => ['nullable', 'string'],
        ])['booking'];

        $tableBookingRequest->fill($data)->save();
        Toast::success('Обновлено');
        return redirect()->route('platform.requests.table-booking');
    }

    public function remove(TableBookingRequest $tableBookingRequest): RedirectResponse
    {
        $tableBookingRequest->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.requests.table-booking');
    }
}
