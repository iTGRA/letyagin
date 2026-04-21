<?php

declare(strict_types=1);

namespace App\Orchid\Screens\TeamMembers;

use App\Models\TeamMember;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class TeamMemberListScreen extends Screen
{
    public function query(): iterable
    {
        return ['members' => TeamMember::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'Команда'; }
    public function description(): ?string { return 'Шеф, менеджеры, команда отеля.'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новый участник')->icon('bs.plus-circle')->route('platform.team-members.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('members', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('name', 'Имя')
                    ->render(fn (TeamMember $m) => Link::make($m->name)->route('platform.team-members.edit', $m)),
                TD::make('role', 'Роль'),
                TD::make('is_featured', 'На главной')->width('120px')
                    ->render(fn (TeamMember $m) => $m->is_featured ? '★' : '—'),
                TD::make('is_active', 'Активен')->width('100px')
                    ->render(fn (TeamMember $m) => $m->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
