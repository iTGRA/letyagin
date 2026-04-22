<?php

declare(strict_types=1);

namespace App\Orchid\Screens\GalleryItems;

use App\Models\GalleryItem;
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

class GalleryItemEditScreen extends Screen
{
    public ?GalleryItem $item = null;

    public function query(GalleryItem $galleryItem): iterable { return ['item' => $galleryItem]; }

    public function name(): ?string { return $this->item?->exists ? 'Редактировать фото' : 'Новое фото галереи'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить фото?')->canSee((bool) $this->item?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Upload::make('item.image_id')->title('Изображение')->maxFiles(1)->acceptedFiles('image/*'),
                Input::make('item.alt_text')->title('Alt-текст')->help('Описание для SEO / доступности')->required()->maxlength(200),
                Input::make('item.caption')
                    ->title('Короткая подпись')
                    ->help('Мелкая Müller-строка под фото: «Кладка 1883», «Латунь и медь». До 40 символов для красоты.')
                    ->maxlength(500),
                TextArea::make('item.description')
                    ->title('Описание')
                    ->rows(3)
                    ->help('Короткое или длинное — длины нарочно разные, создают ритм колонок на главной.'),
                Select::make('item.category')->title('Категория')->options(GalleryItem::CATEGORIES)->empty('— без категории —'),
                Select::make('item.aspect')->title('Аспект')->options(GalleryItem::ASPECTS)->value('wide'),
                Input::make('item.sort_order')->title('Порядок')->type('number')->value(0),
                CheckBox::make('item.is_active')->title('Активно')->sendTrueOrFalse()->value(true),
            ]),
        ];
    }

    public function save(Request $request, GalleryItem $galleryItem): RedirectResponse
    {
        $data = $request->validate([
            'item.alt_text' => ['required', 'string', 'max:200'],
            'item.caption' => ['nullable', 'string', 'max:500'],
            'item.description' => ['nullable', 'string', 'max:2000'],
            'item.category' => ['nullable', 'string', 'max:60'],
            'item.aspect' => ['required', 'string', 'in:tall,wide,square'],
            'item.sort_order' => ['nullable', 'integer'],
            'item.is_active' => ['nullable', 'boolean'],
        ])['item'];

        $attaches = $request->input('item.image_id', []);
        if (empty($attaches) && ! $galleryItem->image_id) {
            Toast::error('Выберите изображение');
            return back();
        }

        $data['image_id'] = ! empty($attaches) ? (int) $attaches[0] : $galleryItem->image_id;
        $galleryItem->fill($data)->save();

        Toast::success('Сохранено');
        return redirect()->route('platform.gallery');
    }

    public function remove(GalleryItem $galleryItem): RedirectResponse
    {
        $galleryItem->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.gallery');
    }
}
