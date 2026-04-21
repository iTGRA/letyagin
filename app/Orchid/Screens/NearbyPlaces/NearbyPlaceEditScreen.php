<?php

declare(strict_types=1);

namespace App\Orchid\Screens\NearbyPlaces;

use App\Models\NearbyPlace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Group;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class NearbyPlaceEditScreen extends Screen
{
    public ?NearbyPlace $place = null;

    public function query(NearbyPlace $nearbyPlace): iterable { return ['place' => $nearbyPlace]; }

    public function name(): ?string { return $this->place?->exists ? 'Редактировать место' : 'Новое место рядом'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить место?')->canSee((bool) $this->place?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('place.name')->title('Название')->required()->maxlength(200),
                Input::make('place.slug')->title('Slug (URL-имя)')->help('Оставьте пустым — сгенерируем автоматически')->maxlength(120),
                Select::make('place.category')->title('Категория')->options(NearbyPlace::CATEGORIES)->required(),
                TextArea::make('place.description')->title('Описание')->rows(3),

                Group::make([
                    Input::make('place.distance_m')->title('Расстояние (м)')->type('number'),
                    Input::make('place.walk_minutes')->title('Пешком (мин)')->type('number'),
                ]),

                Group::make([
                    Input::make('place.geo_lat')->title('Широта')->type('number')->step('0.000001'),
                    Input::make('place.geo_lng')->title('Долгота')->type('number')->step('0.000001'),
                ]),

                Input::make('place.url')->title('Внешняя ссылка')->maxlength(500),

                Upload::make('place.image_id')
                    ->title('Фото места')
                    ->maxFiles(1)
                    ->acceptedFiles('image/*'),

                Input::make('place.sort_order')->title('Порядок')->type('number')->value(0),
                CheckBox::make('place.is_active')->title('Активно')->sendTrueOrFalse()->value(true),
            ]),
        ];
    }

    public function save(Request $request, NearbyPlace $nearbyPlace): RedirectResponse
    {
        $data = $request->validate([
            'place.name' => ['required', 'string', 'max:200'],
            'place.slug' => ['nullable', 'string', 'max:120'],
            'place.category' => ['required', 'string', 'in:' . implode(',', array_keys(NearbyPlace::CATEGORIES))],
            'place.description' => ['nullable', 'string'],
            'place.distance_m' => ['nullable', 'integer', 'min:0'],
            'place.walk_minutes' => ['nullable', 'integer', 'min:0', 'max:255'],
            'place.geo_lat' => ['nullable', 'numeric'],
            'place.geo_lng' => ['nullable', 'numeric'],
            'place.url' => ['nullable', 'url', 'max:500'],
            'place.sort_order' => ['nullable', 'integer'],
            'place.is_active' => ['nullable', 'boolean'],
        ])['place'];

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $attaches = $request->input('place.image_id', []);
        $nearbyPlace->fill($data)->save();
        if (! empty($attaches)) {
            $nearbyPlace->attachment()->syncWithoutDetaching((array) $attaches);
            $nearbyPlace->image_id = (int) $attaches[0];
            $nearbyPlace->save();
        }

        Toast::success('Сохранено');
        return redirect()->route('platform.nearby-places');
    }

    public function remove(NearbyPlace $nearbyPlace): RedirectResponse
    {
        $nearbyPlace->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.nearby-places');
    }
}
