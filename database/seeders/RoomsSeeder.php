<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\RoomAmenity;
use Illuminate\Database\Seeder;

/**
 * Сид 19 номеров-демо. Slug'и из SEO.md §3.3 + нумерация для тех категорий,
 * где несколько физических номеров. Метраж/кол-во гостей — плейсхолдеры,
 * уточнит админ через /admin.
 */
class RoomsSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            // (slug, name, category, area_m2, guests, features, is_featured, is_quiet)
            ['standart-single',     'Стандарт одноместный',        'standart-single',        16, 1, [], false, false],
            ['standart-101',        'Стандарт № 101',              'standart',               18, 2, [], false, true],
            ['standart-102',        'Стандарт № 102',              'standart',               18, 2, [], false, true],
            ['standart-103',        'Стандарт № 103',              'standart',               19, 2, [], false, false],
            ['comfort-201',         'Комфорт № 201',               'comfort',                22, 2, ['Окна во двор'], false, true],
            ['comfort-202',         'Комфорт № 202',               'comfort',                22, 2, [], false, false],
            ['comfort-twin',        'Комфорт Твин',                'comfort-twin',           24, 2, ['Две отдельные кровати'], false, true],
            ['junior-twin',         'Джуниор Твин',                'junior-twin',            26, 2, ['Две отдельные кровати', 'Зона отдыха'], false, false],
            ['deluxe-301',          'Делюкс № 301',                'deluxe',                 28, 2, ['Выделенная гостиная зона'], false, false],
            ['deluxe-302',          'Делюкс № 302',                'deluxe',                 28, 2, [], false, true],
            ['avdotya',             'Авдотьи Библиевой',           'avdotya',                28, 2, ['Винтажная ванна', 'Кирпичная кладка с клеймом Летягина'], true, true],
            ['junior-suite-401',    'Джуниор Сюит № 401',          'junior-suite',           32, 2, ['Раздельные зоны', 'Письменный стол'], false, false],
            ['junior-suite-402',    'Джуниор Сюит № 402',          'junior-suite',           32, 3, ['Раздельные зоны', 'Раскладной диван'], false, false],
            ['junior-semilux',      'Джуниор полулюкс',            'junior-semilux',         35, 2, ['Отдельная гостиная'], false, true],
            ['lux-501',             'Люкс № 501',                  'lux',                    30, 2, ['Гостиная', 'Письменный стол'], false, false],
            ['lux-502',             'Люкс № 502',                  'lux',                    32, 2, ['Окна во двор', 'Гостиная'], false, true],
            ['junior-suite-letyagin','Джуниор Сюит ЛетягинЪ',      'junior-suite-letyagin',  39, 2, ['Исторические интерьеры', 'Кирпичная кладка'], true, false],
            ['letyagin-lux',        'ЛетягинЪ Люкс',               'letyagin-lux',           50, 2, ['Двухкомнатный', 'Отдельное здание', 'Собственный выход во двор'], true, true],
            ['letyagin-lux-studio', 'ЛетягинЪ Люкс Студио',        'letyagin-lux',           45, 2, ['Открытое пространство', 'Исторические окна'], false, true],
        ];

        $defaultAmenityIds = RoomAmenity::whereIn('name', [
            'Wi-Fi высокой скорости', 'Кондиционер', 'Сейф', 'Фен', 'Чайная станция', 'Халат и тапочки',
        ])->pluck('id')->all();

        foreach ($rooms as $i => [$slug, $name, $category, $area, $guests, $features, $featured, $quiet]) {
            $catLabel = Room::CATEGORIES[$category] ?? $category;

            $room = Room::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $name,
                    'category' => $category,
                    'area_m2' => $area,
                    'guests' => $guests,
                    'view_text' => $quiet ? 'Внутренний двор' : 'Улица Самарская',
                    'short_description' => "Номер категории {$catLabel}, {$area} м², для {$guests} гостя(-ей).",
                    'description' => 'Полное описание будет добавлено после получения контента от отеля.',
                    'features' => $features,
                    'is_quiet' => $quiet,
                    'is_featured' => $featured,
                    'is_active' => true,
                    'sort_order' => $i,
                    'seo_title' => "{$name} в бутик-отеле ЛетягинЪ — {$area} м²",
                    'seo_description' => "{$name}: {$area} м², до {$guests} гостей. Бронирование с промокодом LETYAGIN — скидка на прямую бронь.",
                ],
            );

            $room->amenities()->sync($defaultAmenityIds);
        }
    }
}
