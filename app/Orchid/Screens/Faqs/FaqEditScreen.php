<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Faqs;

use App\Models\Faq;
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

class FaqEditScreen extends Screen
{
    public ?Faq $faq = null;

    public function query(Faq $faq): iterable
    {
        return ['faq' => $faq];
    }

    public function name(): ?string
    {
        return $this->faq?->exists ? 'Редактировать вопрос' : 'Новый вопрос';
    }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')
                ->icon('bs.check-circle')
                ->method('save'),
            Button::make('Удалить')
                ->icon('bs.trash')
                ->method('remove')
                ->type(Color::DANGER)
                ->confirm('Удалить этот вопрос?')
                ->canSee((bool) $this->faq?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('faq.question')
                    ->title('Вопрос')
                    ->placeholder('Как сформулировал бы гость?')
                    ->required()
                    ->maxlength(500),

                TextArea::make('faq.answer')
                    ->title('Ответ')
                    ->rows(6)
                    ->required()
                    ->help('Один-два абзаца. Коротко, по делу, без «индивидуального подхода».'),

                Input::make('faq.sort_order')
                    ->title('Порядок')
                    ->type('number')
                    ->value(0),

                CheckBox::make('faq.is_active')
                    ->title('Опубликован')
                    ->sendTrueOrFalse()
                    ->value(true),
            ]),
        ];
    }

    public function save(Request $request, Faq $faq): RedirectResponse
    {
        $data = $request->validate([
            'faq.question' => ['required', 'string', 'max:500'],
            'faq.answer' => ['required', 'string'],
            'faq.sort_order' => ['nullable', 'integer'],
            'faq.is_active' => ['nullable', 'boolean'],
        ])['faq'];

        $faq->fill($data)->save();
        Toast::success('Сохранено');

        return redirect()->route('platform.faqs');
    }

    public function remove(Faq $faq): RedirectResponse
    {
        $faq->delete();
        Toast::info('Удалено');

        return redirect()->route('platform.faqs');
    }
}
