<?php

declare(strict_types=1);

namespace App\Orchid\Screens\SiteSettings;

use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

/**
 * Tabbed-screen на все группы настроек. Каждая группа = одна вкладка.
 * Поля генерятся динамически из базы (таблица site_settings).
 */
class SiteSettingsScreen extends Screen
{
    public function query(): iterable
    {
        $all = SiteSetting::query()->orderBy('group')->orderBy('sort_order')->get();

        return [
            'settings' => $all->keyBy('key')->map(fn ($s) => $s->value)->all(),
            '_meta'    => $all->keyBy('key'),  // для layout
        ];
    }

    public function name(): ?string { return 'Настройки сайта'; }
    public function description(): ?string { return 'Контакты, соцсети, карты, Контур, аналитика, промокод, email-получатели.'; }

    public function commandBar(): iterable
    {
        return [Button::make('Сохранить все настройки')->icon('bs.check-circle')->method('save')];
    }

    public function layout(): iterable
    {
        $groups = [
            'contacts'     => 'Контакты',
            'social'       => 'Соцсети',
            'maps'         => 'Карты',
            'integrations' => 'Контур.Отель',
            'analytics'    => 'Аналитика',
            'promo'        => 'Промокод',
            'email'        => 'Email-получатели',
            'state'        => 'Состояния',
        ];

        $tabs = [];
        foreach ($groups as $groupKey => $groupLabel) {
            $rows = [];
            $items = SiteSetting::query()->where('group', $groupKey)->orderBy('sort_order')->get();
            foreach ($items as $item) {
                $field = match ($item->type) {
                    'textarea' => TextArea::make("settings.{$item->key}")->rows(4),
                    'boolean'  => CheckBox::make("settings.{$item->key}")->sendTrueOrFalse(),
                    default    => Input::make("settings.{$item->key}"),
                };
                $rows[] = $field->title($item->label ?: $item->key)->help($item->hint);
            }
            if ($rows) {
                $tabs[$groupLabel] = Layout::rows($rows);
            }
        }

        return [Layout::tabs($tabs)];
    }

    public function save(Request $request): RedirectResponse
    {
        $submitted = (array) $request->input('settings', []);

        foreach ($submitted as $key => $value) {
            if (is_array($value)) {
                $value = json_encode($value, JSON_UNESCAPED_UNICODE);
            }
            SiteSetting::set($key, (string) ($value ?? ''));
        }

        Toast::success('Настройки сохранены');
        return redirect()->route('platform.site-settings');
    }
}
