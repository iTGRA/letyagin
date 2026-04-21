<?php

declare(strict_types=1);

namespace App\Orchid;

use App\Models\ContactFormRequest;
use App\Models\CorporateRequest;
use App\Models\EventRequest;
use App\Models\TableBookingRequest;
use Orchid\Platform\Dashboard;
use Orchid\Platform\ItemPermission;
use Orchid\Platform\OrchidServiceProvider;
use Orchid\Screen\Actions\Menu;
use Orchid\Support\Color;

class PlatformProvider extends OrchidServiceProvider
{
    public function boot(Dashboard $dashboard): void
    {
        parent::boot($dashboard);
    }

    /**
     * Меню админки отеля. Группировка — по смыслу, а не по алфавиту.
     */
    public function menu(): array
    {
        return [
            // ─── ДАШБОРД ──────────────────────────────────────────
            Menu::make('Дашборд')
                ->icon('bs.speedometer2')
                ->route('platform.main')
                ->title('ЛетягинЪ'),

            // ─── ГЛАВНАЯ СТРАНИЦА ─────────────────────────────────
            Menu::make('Hero-слайды')
                ->icon('bs.image')
                ->route('platform.hero-slides'),

            Menu::make('Страницы (SEO)')
                ->icon('bs.file-text')
                ->route('platform.pages'),

            // ─── НОМЕРА ───────────────────────────────────────────
            Menu::make('Номера')
                ->icon('bs.door-open')
                ->route('platform.rooms')
                ->title('Номера'),

            Menu::make('Удобства (справочник)')
                ->icon('bs.list-check')
                ->route('platform.room-amenities'),

            // ─── РЕСТОРАН ─────────────────────────────────────────
            Menu::make('Меню «Дуси»')
                ->icon('bs.egg-fried')
                ->route('platform.menu-items')
                ->title('Ресторан'),

            Menu::make('Команда')
                ->icon('bs.person-workspace')
                ->route('platform.team-members'),

            // ─── КОНТЕНТ ──────────────────────────────────────────
            Menu::make('Места рядом')
                ->icon('bs.geo-alt')
                ->route('platform.nearby-places')
                ->title('Контент'),

            Menu::make('Услуги отеля')
                ->icon('bs.gem')
                ->route('platform.services'),

            Menu::make('Галерея деталей')
                ->icon('bs.images')
                ->route('platform.gallery'),

            Menu::make('Отзывы')
                ->icon('bs.star')
                ->route('platform.reviews'),

            Menu::make('FAQ')
                ->icon('bs.question-circle')
                ->route('platform.faqs'),

            Menu::make('История (таймлайн)')
                ->icon('bs.hourglass-split')
                ->route('platform.history-milestones'),

            // ─── ЗАЯВКИ ───────────────────────────────────────────
            Menu::make('Бронь стола')
                ->icon('bs.cup-hot')
                ->route('platform.requests.table-booking')
                ->title('Заявки')
                ->badge(fn () => TableBookingRequest::where('status', 'new')->count() ?: null, Color::DANGER),

            Menu::make('Мероприятия (Холл)')
                ->icon('bs.calendar-event')
                ->route('platform.requests.event')
                ->badge(fn () => EventRequest::where('status', 'new')->count() ?: null, Color::DANGER),

            Menu::make('Корп-тариф')
                ->icon('bs.briefcase')
                ->route('platform.requests.corporate')
                ->badge(fn () => CorporateRequest::where('status', 'new')->count() ?: null, Color::DANGER),

            Menu::make('Обратная связь')
                ->icon('bs.envelope')
                ->route('platform.requests.contact')
                ->badge(fn () => ContactFormRequest::where('status', 'new')->count() ?: null, Color::DANGER),

            // ─── УПРАВЛЕНИЕ ───────────────────────────────────────
            Menu::make('Бегущая строка')
                ->icon('bs.megaphone')
                ->route('platform.announcement')
                ->title('Маркетинг'),

            Menu::make('Popup')
                ->icon('bs.chat-square')
                ->route('platform.popup'),

            Menu::make('Настройки сайта')
                ->icon('bs.gear')
                ->route('platform.site-settings')
                ->title('Система'),

            Menu::make(__('Users'))
                ->icon('bs.people')
                ->route('platform.systems.users')
                ->permission('platform.systems.users'),

            Menu::make(__('Roles'))
                ->icon('bs.shield')
                ->route('platform.systems.roles')
                ->permission('platform.systems.roles'),
        ];
    }

    public function permissions(): array
    {
        return [
            ItemPermission::group(__('System'))
                ->addPermission('platform.systems.roles', __('Roles'))
                ->addPermission('platform.systems.users', __('Users')),
        ];
    }
}
