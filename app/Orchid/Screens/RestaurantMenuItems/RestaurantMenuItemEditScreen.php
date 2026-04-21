<?php

declare(strict_types=1);

namespace App\Orchid\Screens\RestaurantMenuItems;

use App\Models\RestaurantMenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class RestaurantMenuItemEditScreen extends Screen
{
    public ?RestaurantMenuItem $item = null;

    public function query(RestaurantMenuItem $restaurantMenuItem): iterable { return ['item' => $restaurantMenuItem]; }

    public function name(): ?string { return $this->item?->exists ? 'Редактировать блюдо' : 'Новое блюдо'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить блюдо?')->canSee((bool) $this->item?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('item.name')->title('Название')->required()->maxlength(200),
                Select::make('item.category')->title('Категория')->options(RestaurantMenuItem::CATEGORIES)->required(),
                TextArea::make('item.description')->title('Описание')->rows(3),
                Input::make('item.price_hint')->title('Цена-подсказка')->help('Например: «от 650 ₽», оставить пустым если без цены')->maxlength(60),
                Upload::make('item.image_id')->title('Фото блюда')->maxFiles(1)->acceptedFiles('image/*'),
                CheckBox::make('item.is_featured')->title('Показывать в превью (главная/ресторан)')->sendTrueOrFalse()->value(false),
                CheckBox::make('item.is_available')->title('В меню')->sendTrueOrFalse()->value(true),
                Input::make('item.sort_order')->title('Порядок')->type('number')->value(0),
            ]),
        ];
    }

    public function save(Request $request, RestaurantMenuItem $restaurantMenuItem): RedirectResponse
    {
        $data = $request->validate([
            'item.name' => ['required', 'string', 'max:200'],
            'item.category' => ['required', 'string', 'in:' . implode(',', array_keys(RestaurantMenuItem::CATEGORIES))],
            'item.description' => ['nullable', 'string'],
            'item.price_hint' => ['nullable', 'string', 'max:60'],
            'item.is_featured' => ['nullable', 'boolean'],
            'item.is_available' => ['nullable', 'boolean'],
            'item.sort_order' => ['nullable', 'integer'],
        ])['item'];

        $attaches = $request->input('item.image_id', []);
        $restaurantMenuItem->fill($data)->save();
        if (! empty($attaches)) {
            $restaurantMenuItem->image_id = (int) $attaches[0];
            $restaurantMenuItem->save();
        }

        Toast::success('Сохранено');
        return redirect()->route('platform.menu-items');
    }

    public function remove(RestaurantMenuItem $restaurantMenuItem): RedirectResponse
    {
        $restaurantMenuItem->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.menu-items');
    }
}
