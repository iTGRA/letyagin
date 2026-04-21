<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Announcement;

use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\DateTimer;
use Orchid\Screen\Fields\Group;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class AnnouncementScreen extends Screen
{
    public ?Announcement $announcement = null;

    public function query(): iterable
    {
        return ['announcement' => Announcement::singleton()];
    }

    public function name(): ?string { return 'Бегущая строка (Announcement)'; }

    public function description(): ?string
    {
        return 'Плашка над хедером с акцией или анонсом. Появляется на всём сайте, когда включена.';
    }

    public function commandBar(): iterable
    {
        return [Button::make('Сохранить')->icon('bs.check-circle')->method('save')];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                CheckBox::make('announcement.is_enabled')
                    ->title('Плашка активна')->sendTrueOrFalse()->value(false),

                TextArea::make('announcement.text')
                    ->title('Текст')->rows(2)->required()->maxlength(500),

                Group::make([
                    Input::make('announcement.link_text')->title('Текст ссылки')->maxlength(200),
                    Input::make('announcement.link_url')->title('URL ссылки')->maxlength(500),
                ]),

                Select::make('announcement.color_variant')
                    ->title('Цветовой вариант')
                    ->options(Announcement::COLOR_VARIANTS)
                    ->value('coral'),

                Group::make([
                    DateTimer::make('announcement.date_from')->title('Активна с')->format('Y-m-d H:i'),
                    DateTimer::make('announcement.date_to')->title('Активна до')->format('Y-m-d H:i'),
                ]),
            ]),
        ];
    }

    public function save(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'announcement.is_enabled' => ['nullable', 'boolean'],
            'announcement.text' => ['required', 'string', 'max:500'],
            'announcement.link_text' => ['nullable', 'string', 'max:200'],
            'announcement.link_url' => ['nullable', 'url', 'max:500'],
            'announcement.color_variant' => ['required', 'in:' . implode(',', array_keys(Announcement::COLOR_VARIANTS))],
            'announcement.date_from' => ['nullable', 'date'],
            'announcement.date_to' => ['nullable', 'date', 'after_or_equal:announcement.date_from'],
        ])['announcement'];

        $a = Announcement::singleton();
        $a->fill($data)->save();

        Toast::success('Сохранено');
        return redirect()->route('platform.announcement');
    }
}
