<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name' => 'Круглосуточный ресепшн',   'description' => 'Приём гостей в любое время',           'icon_name' => 'reception'],
            ['name' => 'Охраняемая парковка',       'description' => 'Бесплатно для гостей отеля',            'icon_name' => 'parking'],
            ['name' => 'Wi-Fi высокой скорости',    'description' => '200 Мбит/с во всех номерах',            'icon_name' => 'wifi'],
            ['name' => 'Ресторан «Дуся»',           'description' => 'Завтраки с 8:00, русская кухня',        'icon_name' => 'restaurant'],
            ['name' => 'Летняя терраса во дворе',   'description' => 'В сезон — с мая по октябрь',            'icon_name' => 'terrace'],
            ['name' => 'Конференц-банкетный зал',   'description' => 'До 80 гостей в ЛетягинЪ-Холле',         'icon_name' => 'hall'],
            ['name' => 'Услуги прачечной',          'description' => 'Стирка и глажка по запросу',            'icon_name' => 'laundry'],
            ['name' => 'Бизнес-центр 24/7',         'description' => 'Для деловых гостей',                     'icon_name' => 'business'],
            ['name' => 'Ранний заезд / поздний выезд','description' => 'По запросу, при наличии возможности', 'icon_name' => 'clock'],
            ['name' => 'Гостям с детьми',           'description' => 'Детская кроватка — по запросу',         'icon_name' => 'family'],
        ];

        foreach ($services as $i => $s) {
            Service::updateOrCreate(
                ['name' => $s['name']],
                array_merge($s, ['sort_order' => $i, 'is_active' => true]),
            );
        }
    }
}
