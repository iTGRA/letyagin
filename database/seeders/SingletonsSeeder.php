<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Popup;
use Illuminate\Database\Seeder;

/**
 * Создаёт singleton-записи Announcement (id=1) и Popup (id=1)
 * в выключенном состоянии. Включает админ через /admin.
 */
class SingletonsSeeder extends Seeder
{
    public function run(): void
    {
        Announcement::updateOrCreate(
            ['id' => Announcement::SINGLETON_ID],
            [
                'is_enabled' => false,
                'text' => 'Бронируйте через сайт — промокод LETYAGIN, скидка 7%.',
                'link_url' => null,
                'link_text' => 'Проверить даты',
                'color_variant' => 'coral',
            ],
        );

        Popup::updateOrCreate(
            ['id' => Popup::SINGLETON_ID],
            [
                'is_enabled' => false,
                'title' => 'Бесплатный ранний заезд',
                'body' => 'Для бронирований от 3 ночей — ранний заезд с 10:00 бесплатно. Промокод EARLY.',
                'cta_text' => 'Забронировать',
                'cta_url' => null,
                'trigger_type' => 'on_load',
                'delay_seconds' => 10,
                'frequency' => 'once_per_session',
            ],
        );
    }
}
