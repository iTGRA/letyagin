<?php

declare(strict_types=1);

namespace App\Orchid\Screens\HistoryMilestones;

use App\Models\HistoryMilestone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class HistoryMilestoneEditScreen extends Screen
{
    public ?HistoryMilestone $milestone = null;

    public function query(HistoryMilestone $historyMilestone): iterable { return ['milestone' => $historyMilestone]; }

    public function name(): ?string { return $this->milestone?->exists ? 'Редактировать веху' : 'Новая веха'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить веху?')->canSee((bool) $this->milestone?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('milestone.year_label')->title('Год / метка')
                    ->help('«1883», «1917», «Сегодня» — как будет показано на сайте')
                    ->required()->maxlength(30),
                Input::make('milestone.headline')->title('Заголовок')->required()->maxlength(200),
                TextArea::make('milestone.body')->title('Описание')->rows(4)->required(),
                Upload::make('milestone.image_id')->title('Фото (опционально)')->maxFiles(1)->acceptedFiles('image/*'),
                Input::make('milestone.sort_order')->title('Порядок')->type('number')->value(0),
                CheckBox::make('milestone.is_active')->title('Активна')->sendTrueOrFalse()->value(true),
            ]),
        ];
    }

    public function save(Request $request, HistoryMilestone $historyMilestone): RedirectResponse
    {
        $data = $request->validate([
            'milestone.year_label' => ['required', 'string', 'max:30'],
            'milestone.headline' => ['required', 'string', 'max:200'],
            'milestone.body' => ['required', 'string'],
            'milestone.sort_order' => ['nullable', 'integer'],
            'milestone.is_active' => ['nullable', 'boolean'],
        ])['milestone'];

        $attaches = $request->input('milestone.image_id', []);
        $historyMilestone->fill($data)->save();
        if (! empty($attaches)) {
            $historyMilestone->image_id = (int) $attaches[0];
            $historyMilestone->save();
        }

        Toast::success('Сохранено');
        return redirect()->route('platform.history-milestones');
    }

    public function remove(HistoryMilestone $historyMilestone): RedirectResponse
    {
        $historyMilestone->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.history-milestones');
    }
}
