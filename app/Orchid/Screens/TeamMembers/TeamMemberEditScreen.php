<?php

declare(strict_types=1);

namespace App\Orchid\Screens\TeamMembers;

use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Code;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class TeamMemberEditScreen extends Screen
{
    public ?TeamMember $member = null;

    public function query(TeamMember $teamMember): iterable
    {
        return ['member' => $teamMember];
    }

    public function name(): ?string { return $this->member?->exists ? 'Редактировать участника' : 'Новый участник команды'; }

    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить')->icon('bs.check-circle')->method('save'),
            Button::make('Удалить')->icon('bs.trash')->method('remove')->type(Color::DANGER)
                ->confirm('Удалить из команды?')->canSee((bool) $this->member?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('member.name')->title('Имя')->required()->maxlength(200),
                Input::make('member.role')->title('Роль')->required()->maxlength(200),
                Input::make('member.slug')->title('Slug')->help('Для будущей биографии. Оставьте пусто — сгенерим.')->maxlength(120),
                TextArea::make('member.bio')->title('Биография')->rows(6),
                Upload::make('member.photo_id')->title('Фото')->maxFiles(1)->acceptedFiles('image/*'),
                Code::make('member.facts')->title('Факты (JSON)')->language('json')
                    ->help('Массив объектов [{label, value}]. Пример: [{"label":"стаж","value":"14 лет"}]'),
                CheckBox::make('member.is_featured')->title('Показывать на главной/ресторане')->sendTrueOrFalse()->value(false),
                CheckBox::make('member.is_active')->title('Активен')->sendTrueOrFalse()->value(true),
                Input::make('member.sort_order')->title('Порядок')->type('number')->value(0),
            ]),
        ];
    }

    public function save(Request $request, TeamMember $teamMember): RedirectResponse
    {
        $data = $request->validate([
            'member.name' => ['required', 'string', 'max:200'],
            'member.role' => ['required', 'string', 'max:200'],
            'member.slug' => ['nullable', 'string', 'max:120'],
            'member.bio' => ['nullable', 'string'],
            'member.facts' => ['nullable', 'string'],
            'member.is_featured' => ['nullable', 'boolean'],
            'member.is_active' => ['nullable', 'boolean'],
            'member.sort_order' => ['nullable', 'integer'],
        ])['member'];

        if (! empty($data['facts'])) {
            $decoded = json_decode($data['facts'], true);
            $data['facts'] = is_array($decoded) ? $decoded : null;
        }

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $attaches = $request->input('member.photo_id', []);
        $teamMember->fill($data)->save();
        if (! empty($attaches)) {
            $teamMember->photo_id = (int) $attaches[0];
            $teamMember->save();
        }

        Toast::success('Сохранено');
        return redirect()->route('platform.team-members');
    }

    public function remove(TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();
        Toast::info('Удалено');
        return redirect()->route('platform.team-members');
    }
}
