<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Reviews;

use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\DateTimer;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class ReviewEditScreen extends Screen
{
    public ?Review $review = null;

    public function query(Review $review): iterable { return ['review' => $review]; }

    public function name(): ?string { return $this->review?->exists ? 'Редактировать отзыв' : 'Новый отзыв'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить отзыв?')->canSee((bool) $this->review?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('review.author_name')->title('Имя автора')->required()->maxlength(200),
                Select::make('review.source')->title('Источник')
                    ->options(Review::SOURCES)->required(),
                Input::make('review.source_url')->title('Ссылка на источник')->maxlength(500),
                Input::make('review.rating')->title('Оценка (1-5)')->type('number')->min(1)->max(5),
                Select::make('review.topic')->title('Тематика')
                    ->options(Review::TOPICS)->empty('— без темы —'),
                DateTimer::make('review.posted_at')->title('Дата отзыва')->format('Y-m-d'),
                TextArea::make('review.text')->title('Текст отзыва')->rows(6)->required(),
                CheckBox::make('review.is_featured')->title('В блок избранных')->sendTrueOrFalse()->value(false),
                CheckBox::make('review.is_active')->title('Опубликован')->sendTrueOrFalse()->value(true),
                Input::make('review.sort_order')->title('Порядок')->type('number')->value(0),
            ]),
        ];
    }

    public function save(Request $request, Review $review): RedirectResponse
    {
        $data = $request->validate([
            'review.author_name' => ['required', 'string', 'max:200'],
            'review.source' => ['required', 'string', 'in:' . implode(',', array_keys(Review::SOURCES))],
            'review.source_url' => ['nullable', 'url', 'max:500'],
            'review.rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'review.topic' => ['nullable', 'string'],
            'review.posted_at' => ['nullable', 'date'],
            'review.text' => ['required', 'string'],
            'review.is_featured' => ['nullable', 'boolean'],
            'review.is_active' => ['nullable', 'boolean'],
            'review.sort_order' => ['nullable', 'integer'],
        ])['review'];

        $review->fill($data)->save();
        Toast::success('Сохранено');
        return redirect()->route('platform.reviews');
    }

    public function remove(Review $review): RedirectResponse
    {
        $review->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.reviews');
    }
}
