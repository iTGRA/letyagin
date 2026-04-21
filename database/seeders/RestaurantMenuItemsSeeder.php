<?php

namespace Database\Seeders;

use App\Models\RestaurantMenuItem;
use Illuminate\Database\Seeder;

/**
 * 7 хэдлайнеров из CONTENT.md /restaurant §04. Канонические блюда «Дуси».
 */
class RestaurantMenuItemsSeeder extends Seeder
{
    public function run(): void
    {
        RestaurantMenuItem::query()->delete();

        $items = [
            ['Грузди со сметаной и зеленью',         'starter',   'Собственный посол, домашняя сметана. Подаём в глиняной миске.',      true],
            ['Драники с красной икрой и сметаной',   'breakfast', 'Классика завтрака. Картошка, а не тесто — как учили бабушки.',       true],
            ['Рассольник на говяжьих рёбрах',        'soup',      'Наваристый, настоящий. Готовим 6 часов, подаём с чёрным хлебом.',    true],
            ['Тончайшее сало с чёрным перцем',       'starter',   'Режем при вас, подаём с горчицей и ржаным хлебом.',                  true],
            ['Домашние пирожки с четырьмя начинками','breakfast', 'Капуста, мясо, грибы, вишня. Пекут каждое утро.',                    true],
            ['Яйца су-вид с лососем и драниками',    'breakfast', 'Завтрак, за которым приезжают специально. Готовим с 8:00.',          true],
            ['Чебуреки мини на выбор',               'main',      'Говядина, сыр-зелень, тыква. Закажите сразу три — пожалеете, что не заказали шесть.', true],
        ];

        foreach ($items as $i => [$name, $cat, $desc, $featured]) {
            RestaurantMenuItem::create([
                'name' => $name,
                'category' => $cat,
                'description' => $desc,
                'is_featured' => $featured,
                'is_available' => true,
                'sort_order' => $i,
            ]);
        }
    }
}
