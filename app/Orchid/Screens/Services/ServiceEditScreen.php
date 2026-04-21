<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Services;

use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class ServiceEditScreen extends Screen
{
    public ?Service $service = null;

    public function query(Service $service): iterable { return ['service' => $service]; }

    public function name(): ?string { return $this->service?->exists ? 'Редактирование услуги' : 'Новая услуга'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить услугу?')->canSee((bool) $this->service?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('service.name')->title('Название')->required()->maxlength(200),
                TextArea::make('service.description')->title('Описание')->rows(3),
                Input::make('service.icon_name')->title('Иконка (имя SVG)')->help('Например: wifi, parking, reception'),
                Input::make('service.sort_order')->title('Порядок')->type('number')->value(0),
                CheckBox::make('service.is_active')->title('Активна')->sendTrueOrFalse()->value(true),
            ]),
        ];
    }

    public function save(Request $request, Service $service): RedirectResponse
    {
        $data = $request->validate([
            'service.name' => ['required', 'string', 'max:200'],
            'service.description' => ['nullable', 'string', 'max:500'],
            'service.icon_name' => ['nullable', 'string', 'max:80'],
            'service.sort_order' => ['nullable', 'integer'],
            'service.is_active' => ['nullable', 'boolean'],
        ])['service'];

        $service->fill($data)->save();
        Toast::success('Сохранено');
        return redirect()->route('platform.services');
    }

    public function remove(Service $service): RedirectResponse
    {
        $service->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.services');
    }
}
