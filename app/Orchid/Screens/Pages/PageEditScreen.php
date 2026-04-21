<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Pages;

use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class PageEditScreen extends Screen
{
    public ?Page $page = null;

    public function query(Page $page): iterable { return ['page' => $page]; }

    public function name(): ?string { return 'Страница: /' . ($this->page?->slug ?? ''); }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('page.slug')->title('URL (slug)')->disabled()->value($this->page?->slug ?? ''),
                Input::make('page.h1')->title('H1')->maxlength(300),
                Input::make('page.meta_title')->title('Meta title (≤60 симв.)')->maxlength(300),
                TextArea::make('page.meta_description')->title('Meta description (≤160 симв.)')->rows(3)->maxlength(500),
                TextArea::make('page.intro_text')->title('Intro-текст / подзаголовок hero')->rows(3),
                Upload::make('page.og_image_id')->title('OG-image (для соцсетей)')->maxFiles(1)->acceptedFiles('image/*'),
                Select::make('page.schema_type')->title('Тип schema.org')->options(Page::SCHEMA_TYPES),
                CheckBox::make('page.is_active')->title('Страница активна')->sendTrueOrFalse()->value(true),
            ]),
        ];
    }

    public function save(Request $request, Page $page): RedirectResponse
    {
        $data = $request->validate([
            'page.h1' => ['nullable', 'string', 'max:300'],
            'page.meta_title' => ['nullable', 'string', 'max:300'],
            'page.meta_description' => ['nullable', 'string', 'max:500'],
            'page.intro_text' => ['nullable', 'string'],
            'page.schema_type' => ['nullable', 'string', 'in:' . implode(',', array_keys(Page::SCHEMA_TYPES))],
            'page.is_active' => ['nullable', 'boolean'],
        ])['page'];

        $attaches = $request->input('page.og_image_id', []);
        $page->fill($data)->save();
        if (! empty($attaches)) {
            $page->og_image_id = (int) $attaches[0];
            $page->save();
        }

        Toast::success('Страница сохранена');
        return redirect()->route('platform.pages.edit', $page);
    }
}
