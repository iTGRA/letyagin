<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Rooms;

use App\Models\Room;
use App\Models\RoomAmenity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Code;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Group;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Quill;
use Orchid\Screen\Fields\Relation;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class RoomEditScreen extends Screen
{
    public ?Room $room = null;

    public function query(Room $room): iterable
    {
        $room->load('amenities');
        return [
            'room' => $room,
            'amenity_ids' => $room->amenities->pluck('id')->all(),
        ];
    }

    public function name(): ?string { return $this->room?->exists ? ('Номер: ' . $this->room->name) : 'Новый номер'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить номер?')->canSee((bool) $this->room?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::tabs([
                'Основное' => Layout::rows([
                    Input::make('room.name')->title('Название')->required()->maxlength(200),
                    Input::make('room.slug')->title('Slug (URL)')->help('Оставьте пусто — сгенерируем. Меняйте осторожно — поломает SEO.')->maxlength(120),
                    Select::make('room.category')->title('Категория')->options(Room::CATEGORIES)->required(),

                    Group::make([
                        Input::make('room.area_m2')->title('Метраж (м²)')->type('number')->required(),
                        Input::make('room.guests')->title('Гостей (основных)')->type('number')->required(),
                    ]),

                    CheckBox::make('room.extra_bed')->title('Доп. кровать возможна')->sendTrueOrFalse()->value(false),
                    Input::make('room.view_text')->title('Вид из окна')->maxlength(200),

                    TextArea::make('room.short_description')->title('Краткое описание (для карточки)')->rows(3),
                    Quill::make('room.description')->title('Полное описание (для страницы)'),

                    Code::make('room.features')->title('Особенности (JSON-массив строк)')->language('json')
                        ->help('Пример: ["Винтажная ванна", "Выход во двор"]'),

                    CheckBox::make('room.is_quiet')->title('Тихий (окна во двор)')->sendTrueOrFalse()->value(false),
                    CheckBox::make('room.is_featured')->title('Показывать как «герой» на /rooms')->sendTrueOrFalse()->value(false),
                    CheckBox::make('room.is_active')->title('Опубликован')->sendTrueOrFalse()->value(true),
                    Input::make('room.sort_order')->title('Порядок')->type('number')->value(0),
                ]),

                'Фото и видео' => Layout::rows([
                    Upload::make('room.hero_image_id')->title('Главное фото номера')->maxFiles(1)->acceptedFiles('image/*'),
                    Input::make('room.video_url')->title('URL видео (Rutube/YouTube)')->maxlength(500),
                ]),

                'Удобства' => Layout::rows([
                    Relation::make('amenity_ids.')->title('Удобства в номере')
                        ->fromModel(RoomAmenity::class, 'name')
                        ->multiple()
                        ->help('Отметьте все удобства, доступные в этом номере'),
                ]),

                'SEO' => Layout::rows([
                    Input::make('room.seo_title')->title('SEO Title')->maxlength(255),
                    TextArea::make('room.seo_description')->title('SEO Description')->rows(3)->maxlength(500),
                ]),
            ]),
        ];
    }

    public function save(Request $request, Room $room): RedirectResponse
    {
        $data = $request->validate([
            'room.name' => ['required', 'string', 'max:200'],
            'room.slug' => ['nullable', 'string', 'max:120'],
            'room.category' => ['required', 'string', 'in:' . implode(',', array_keys(Room::CATEGORIES))],
            'room.area_m2' => ['required', 'integer', 'min:1'],
            'room.guests' => ['required', 'integer', 'min:1', 'max:10'],
            'room.extra_bed' => ['nullable', 'boolean'],
            'room.view_text' => ['nullable', 'string', 'max:200'],
            'room.short_description' => ['nullable', 'string'],
            'room.description' => ['nullable', 'string'],
            'room.features' => ['nullable', 'string'],
            'room.is_quiet' => ['nullable', 'boolean'],
            'room.is_featured' => ['nullable', 'boolean'],
            'room.is_active' => ['nullable', 'boolean'],
            'room.sort_order' => ['nullable', 'integer'],
            'room.video_url' => ['nullable', 'url', 'max:500'],
            'room.seo_title' => ['nullable', 'string', 'max:255'],
            'room.seo_description' => ['nullable', 'string', 'max:500'],
        ])['room'];

        if (! empty($data['features'])) {
            $decoded = json_decode($data['features'], true);
            $data['features'] = is_array($decoded) ? $decoded : [];
        }

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $hero = $request->input('room.hero_image_id', []);
        $room->fill($data)->save();
        if (! empty($hero)) {
            $room->hero_image_id = (int) $hero[0];
            $room->save();
        }

        $amenityIds = array_filter((array) $request->input('amenity_ids', []));
        $room->amenities()->sync($amenityIds);

        Toast::success('Номер сохранён');
        return redirect()->route('platform.rooms.edit', $room);
    }

    public function remove(Room $room): RedirectResponse
    {
        $room->delete();
        Toast::info('Номер удалён');
        return redirect()->route('platform.rooms');
    }
}
