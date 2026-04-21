<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Requests;

use App\Models\CorporateRequest;
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

class CorporateRequestEditScreen extends Screen
{
    public ?CorporateRequest $request_model = null;

    public function query(CorporateRequest $corporateRequest): iterable
    {
        return ['request_model' => $corporateRequest];
    }

    public function name(): ?string { return 'Корп-заявка #' . $this->request_model?->id; }

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
                Input::make('request_model.company')->title('Компания')->disabled(),
                Input::make('request_model.name')->title('Контактное лицо')->disabled(),
                Input::make('request_model.phone')->title('Телефон')->disabled(),
                Input::make('request_model.email')->title('Email')->disabled(),
                Input::make('request_model.estimated_nights_per_year')->title('Ночей в год (прим.)')->disabled(),
                TextArea::make('request_model.comment')->title('Комментарий')->rows(3)->disabled(),
                Input::make('request_model.source')->title('Источник')->disabled(),
                Select::make('request_model.status')->title('Статус')->options(CorporateRequest::STATUSES),
                TextArea::make('request_model.admin_notes')->title('Заметки админа')->rows(3),
            ]),
        ];
    }

    public function save(Request $request, CorporateRequest $corporateRequest): RedirectResponse
    {
        $data = $request->validate([
            'request_model.status' => ['required', 'string', 'in:' . implode(',', array_keys(CorporateRequest::STATUSES))],
            'request_model.admin_notes' => ['nullable', 'string'],
        ])['request_model'];

        $corporateRequest->fill($data)->save();
        Toast::success('Обновлено');
        return redirect()->route('platform.requests.corporate');
    }

    public function remove(CorporateRequest $corporateRequest): RedirectResponse
    {
        $corporateRequest->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.requests.corporate');
    }
}
