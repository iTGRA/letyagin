<?php

namespace Database\Seeders;

use App\Models\RoomAmenity;
use Illuminate\Database\Seeder;

class RoomAmenitiesSeeder extends Seeder
{
    public function run(): void
    {
        $amenities = [
            ['name' => 'Wi-Fi высокой скорости', 'icon_name' => 'wifi'],
            ['name' => 'Кондиционер',            'icon_name' => 'wind'],
            ['name' => 'Мини-бар',               'icon_name' => 'glass'],
            ['name' => 'Сейф',                   'icon_name' => 'lock'],
            ['name' => 'Фен',                    'icon_name' => 'breeze'],
            ['name' => 'Чайная станция',         'icon_name' => 'teacup'],
            ['name' => 'Халат и тапочки',        'icon_name' => 'robe'],
            ['name' => 'Рабочий стол',           'icon_name' => 'desk'],
            ['name' => 'Smart TV',               'icon_name' => 'tv'],
            ['name' => 'Косметика в ванной',     'icon_name' => 'bath'],
            ['name' => 'Детская кроватка по запросу', 'icon_name' => 'crib'],
            ['name' => 'Дополнительная кровать', 'icon_name' => 'bed-plus'],
        ];

        foreach ($amenities as $i => $a) {
            RoomAmenity::updateOrCreate(
                ['name' => $a['name']],
                array_merge($a, ['sort_order' => $i, 'is_active' => true]),
            );
        }
    }
}
