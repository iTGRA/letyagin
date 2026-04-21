<?php

declare(strict_types=1);

namespace App\Orchid\Screens\HistoryMilestones;

use App\Models\HistoryMilestone;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class HistoryMilestoneListScreen extends Screen
{
    public function query(): iterable
    {
        return ['milestones' => HistoryMilestone::query()->orderBy('sort_order')->paginate(50)];
    }

    public function name(): ?string { return 'История — таймлайн'; }
    public function description(): ?string { return 'Вехи истории особняка (1883 → сегодня).'; }

    public function commandBar(): iterable
    {
        return [Link::make('Новая веха')->icon('bs.plus-circle')->route('platform.history-milestones.create')];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('milestones', [
                TD::make('sort_order', '№')->width('60px'),
                TD::make('year_label', 'Год')->width('100px')
                    ->render(fn (HistoryMilestone $m) => Link::make($m->year_label)->route('platform.history-milestones.edit', $m)),
                TD::make('headline', 'Заголовок'),
                TD::make('is_active', 'Активна')->width('100px')
                    ->render(fn (HistoryMilestone $m) => $m->is_active ? '✓' : '—'),
            ]),
        ];
    }
}
