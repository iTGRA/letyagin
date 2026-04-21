<?php

declare(strict_types=1);

namespace App\Orchid\Screens\RoomAmenities;

use App\Models\RoomAmenity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class RoomAmenityEditScreen extends Screen
{
    public ?RoomAmenity $amenity = null;

    public function query(RoomAmenity $amenity): iterable { return ['amenity' => $amenity]; }

    public function name(): ?string { return $this->amenity?->exists ? 'Редактировать удобство' : 'Новое удобство'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить удобство из справочника?')->canSee((bool) $this->amenity?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('amenity.name')->title('Название')->required()->maxlength(200),
                Input::make('amenity.icon_name')->title('Иконка')->help('Имя SVG-иконки'),
                Input::make('amenity.sort_order')->title('Порядок')->type('number')->value(0),
                CheckBox::make('amenity.is_active')->title('Активно')->sendTrueOrFalse()->value(true),
            ]),
        ];
    }

    public function save(Request $request, RoomAmenity $amenity): RedirectResponse
    {
        $data = $request->validate([
            'amenity.name' => ['required', 'string', 'max:200'],
            'amenity.icon_name' => ['nullable', 'string', 'max:80'],
            'amenity.sort_order' => ['nullable', 'integer'],
            'amenity.is_active' => ['nullable', 'boolean'],
        ])['amenity'];

        $amenity->fill($data)->save();
        Toast::success('Сохранено');
        return redirect()->route('platform.room-amenities');
    }

    public function remove(RoomAmenity $amenity): RedirectResponse
    {
        $amenity->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.room-amenities');
    }
}
