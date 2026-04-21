<?php

namespace Database\Seeders;

use App\Models\RoomAmenity;
use Illuminate\Database\Seeder;

/**
 * 8 удобств уровня НОМЕРА из CONTENT.md §2 Блок 06b.
 */
class RoomAmenitiesSeeder extends Seeder
{
    public function run(): void
    {
        RoomAmenity::query()->delete();

        $amenities = [
            ['name' => 'Wi-Fi высокой скорости',      'icon_name' => 'wifi'],
            ['name' => 'Кондиционер',                  'icon_name' => 'wind'],
            ['name' => 'Smart TV',                     'icon_name' => 'tv'],
            ['name' => 'Сейф',                         'icon_name' => 'lock'],
            ['name' => 'Фен',                          'icon_name' => 'breeze'],
            ['name' => 'Халат и тапочки',              'icon_name' => 'robe'],
            ['name' => 'Гладильная доска и утюг',      'icon_name' => 'iron'],
            ['name' => 'Чайная станция',               'icon_name' => 'teacup'],
            ['name' => 'Детская кроватка по запросу',  'icon_name' => 'crib'],
        ];

        foreach ($amenities as $i => $a) {
            RoomAmenity::create(array_merge($a, ['sort_order' => $i, 'is_active' => true]));
        }
    }
}
