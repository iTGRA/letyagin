<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Requests;

use App\Models\ContactFormRequest;
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

class ContactFormEditScreen extends Screen
{
    public ?ContactFormRequest $request_model = null;

    public function query(ContactFormRequest $contactFormRequest): iterable
    {
        return ['request_model' => $contactFormRequest];
    }

    public function name(): ?string { return 'Обращение #' . $this->request_model?->id; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить обращение?')->canSee((bool) $this->request_model?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('request_model.name')->title('Имя')->disabled(),
                Input::make('request_model.phone')->title('Телефон')->disabled(),
                Input::make('request_model.email')->title('Email')->disabled(),
                TextArea::make('request_model.message')->title('Сообщение')->rows(6)->disabled(),
                Input::make('request_model.source')->title('Источник')->disabled(),
                Select::make('request_model.status')->title('Статус')->options(ContactFormRequest::STATUSES),
                TextArea::make('request_model.admin_notes')->title('Заметки админа')->rows(3),
            ]),
        ];
    }

    public function save(Request $request, ContactFormRequest $contactFormRequest): RedirectResponse
    {
        $data = $request->validate([
            'request_model.status' => ['required', 'string', 'in:' . implode(',', array_keys(ContactFormRequest::STATUSES))],
            'request_model.admin_notes' => ['nullable', 'string'],
        ])['request_model'];

        $contactFormRequest->fill($data)->save();
        Toast::success('Обновлено');
        return redirect()->route('platform.requests.contact');
    }

    public function remove(ContactFormRequest $contactFormRequest): RedirectResponse
    {
        $contactFormRequest->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.requests.contact');
    }
}
