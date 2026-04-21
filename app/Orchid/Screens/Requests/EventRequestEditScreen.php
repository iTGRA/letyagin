<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Requests;

use App\Models\EventRequest;
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

class EventRequestEditScreen extends Screen
{
    public ?EventRequest $request_model = null;

    public function query(EventRequest $eventRequest): iterable
    {
        return ['request_model' => $eventRequest];
    }

    public function name(): ?string { return 'Заявка на мероприятие #' . $this->request_model?->id; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить заявку?')->canSee((bool) $this->request_model?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('request_model.name')->title('Имя')->disabled(),
                Input::make('request_model.phone')->title('Телефон')->disabled(),
                Input::make('request_model.email')->title('Email')->disabled(),
                Input::make('request_model.event_type')->title('Тип')->disabled(),
                Input::make('request_model.event_date')->title('Дата события')->disabled(),
                Input::make('request_model.guests_count')->title('Гостей')->disabled(),
                TextArea::make('request_model.comment')->title('Комментарий гостя')->rows(3)->disabled(),
                Input::make('request_model.source')->title('Источник')->disabled(),
                Select::make('request_model.status')->title('Статус')->options(EventRequest::STATUSES),
                TextArea::make('request_model.admin_notes')->title('Заметки админа')->rows(3),
            ]),
        ];
    }

    public function save(Request $request, EventRequest $eventRequest): RedirectResponse
    {
        $data = $request->validate([
            'request_model.status' => ['required', 'string', 'in:' . implode(',', array_keys(EventRequest::STATUSES))],
            'request_model.admin_notes' => ['nullable', 'string'],
        ])['request_model'];

        $eventRequest->fill($data)->save();
        Toast::success('Обновлено');
        return redirect()->route('platform.requests.event');
    }

    public function remove(EventRequest $eventRequest): RedirectResponse
    {
        $eventRequest->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.requests.event');
    }
}
