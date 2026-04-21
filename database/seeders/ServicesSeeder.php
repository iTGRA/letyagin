<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

/**
 * 10 услуг уровня ОТЕЛЯ из CONTENT.md §2 Блок 06a.
 */
class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        Service::query()->delete();

        $services = [
            ['name' => 'Быстрый Wi-Fi',               'description' => 'Во всех номерах и общих зонах',          'icon_name' => 'wifi'],
            ['name' => 'Охраняемая парковка',          'description' => 'Бесплатно, 15 мест во дворе',            'icon_name' => 'parking'],
            ['name' => 'Ресепшн 24/7',                 'description' => 'Регистрация в любое время',              'icon_name' => 'reception'],
            ['name' => 'Бизнес-центр 24/7',            'description' => 'Печать, сканирование, переговорная',     'icon_name' => 'business'],
            ['name' => 'Услуги прачечной',             'description' => 'Стирка, химчистка, глажка',              'icon_name' => 'laundry'],
            ['name' => 'Летняя веранда',               'description' => 'Во внутреннем закрытом дворе',           'icon_name' => 'terrace'],
            ['name' => 'Завтраки в «Дусе»',            'description' => 'С 8:00',                                 'icon_name' => 'restaurant'],
            ['name' => 'Конференц-зал',                'description' => 'До 60 гостей',                           'icon_name' => 'hall'],
            ['name' => 'Ранний заезд / поздний выезд', 'description' => 'По запросу',                             'icon_name' => 'clock'],
            ['name' => 'Хранение багажа',              'description' => 'До заселения и после выезда',            'icon_name' => 'luggage'],
        ];

        foreach ($services as $i => $s) {
            Service::create(array_merge($s, ['sort_order' => $i, 'is_active' => true]));
        }
    }
}
