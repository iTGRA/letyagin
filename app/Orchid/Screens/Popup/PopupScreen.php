<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Popup;

use App\Models\Popup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\DateTimer;
use Orchid\Screen\Fields\Group;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class PopupScreen extends Screen
{
    public ?Popup $popup = null;

    public function query(): iterable
    {
        return ['popup' => Popup::singleton()];
    }

    public function name(): ?string { return 'Всплывающее окно (Popup)'; }

    public function description(): ?string
    {
        return 'Одно модальное окно на весь сайт. Не букинг-стиль — элегантно, один CTA.';
    }

    public function commandBar(): iterable
    {
        return [Button::make('Сохранить')->icon('bs.check-circle')->method('save')];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                CheckBox::make('popup.is_enabled')->title('Popup активен')->sendTrueOrFalse()->value(false),
                Input::make('popup.title')->title('Заголовок')->required()->maxlength(200),
                TextArea::make('popup.body')->title('Текст')->rows(4)->required(),
                Upload::make('popup.image_id')->title('Фото (опц.)')->maxFiles(1)->acceptedFiles('image/*'),

                Group::make([
                    Input::make('popup.cta_text')->title('Текст кнопки')->maxlength(200),
                    Input::make('popup.cta_url')->title('URL кнопки')->maxlength(500),
                ]),

                Group::make([
                    Select::make('popup.trigger_type')->title('Триггер')->options(Popup::TRIGGERS),
                    Input::make('popup.delay_seconds')->title('Задержка (сек)')->type('number')->min(0)->value(0),
                ]),

                Select::make('popup.frequency')->title('Частота показа')->options(Popup::FREQUENCIES),

                Group::make([
                    DateTimer::make('popup.date_from')->title('Активен с')->format('Y-m-d H:i'),
                    DateTimer::make('popup.date_to')->title('Активен до')->format('Y-m-d H:i'),
                ]),
            ]),
        ];
    }

    public function save(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'popup.is_enabled' => ['nullable', 'boolean'],
            'popup.title' => ['required', 'string', 'max:200'],
            'popup.body' => ['required', 'string'],
            'popup.cta_text' => ['nullable', 'string', 'max:200'],
            'popup.cta_url' => ['nullable', 'url', 'max:500'],
            'popup.trigger_type' => ['required', 'in:' . implode(',', array_keys(Popup::TRIGGERS))],
            'popup.delay_seconds' => ['nullable', 'integer', 'min:0', 'max:3600'],
            'popup.frequency' => ['required', 'in:' . implode(',', array_keys(Popup::FREQUENCIES))],
            'popup.date_from' => ['nullable', 'date'],
            'popup.date_to' => ['nullable', 'date', 'after_or_equal:popup.date_from'],
        ])['popup'];

        $p = Popup::singleton();
        $attaches = $request->input('popup.image_id', []);
        $p->fill($data)->save();
        if (! empty($attaches)) {
            $p->image_id = (int) $attaches[0];
            $p->save();
        }

        Toast::success('Сохранено');
        return redirect()->route('platform.popup');
    }
}
