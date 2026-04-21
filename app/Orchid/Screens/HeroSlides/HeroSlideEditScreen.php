<?php

declare(strict_types=1);

namespace App\Orchid\Screens\HeroSlides;

use App\Models\HeroSlide;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class HeroSlideEditScreen extends Screen
{
    public ?HeroSlide $slide = null;

    public function query(HeroSlide $heroSlide): iterable { return ['slide' => $heroSlide]; }

    public function name(): ?string { return $this->slide?->exists ? 'Редактировать слайд' : 'Новый Hero-слайд'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить слайд?')->canSee((bool) $this->slide?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Upload::make('slide.image_id')->title('Фон слайда — фото')->maxFiles(1)->acceptedFiles('image/*'),
                Input::make('slide.video_url')->title('URL видео (Rutube/YouTube) — опционально')->maxlength(500)
                    ->help('Если указано — будет показано вместо фото'),
                Input::make('slide.title')->title('Подпись над заголовком')->maxlength(200),
                Input::make('slide.subtitle')->title('Описание')->maxlength(400),
                Input::make('slide.sort_order')->title('Порядок')->type('number')->value(0),
                CheckBox::make('slide.is_active')->title('Активен')->sendTrueOrFalse()->value(true),
            ]),
        ];
    }

    public function save(Request $request, HeroSlide $heroSlide): RedirectResponse
    {
        $data = $request->validate([
            'slide.video_url' => ['nullable', 'url', 'max:500'],
            'slide.title' => ['nullable', 'string', 'max:200'],
            'slide.subtitle' => ['nullable', 'string', 'max:400'],
            'slide.sort_order' => ['nullable', 'integer'],
            'slide.is_active' => ['nullable', 'boolean'],
        ])['slide'];

        $attaches = $request->input('slide.image_id', []);
        $heroSlide->fill($data)->save();
        if (! empty($attaches)) {
            $heroSlide->image_id = (int) $attaches[0];
            $heroSlide->save();
        }

        Toast::success('Сохранено');
        return redirect()->route('platform.hero-slides');
    }

    public function remove(HeroSlide $heroSlide): RedirectResponse
    {
        $heroSlide->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.hero-slides');
    }
}
