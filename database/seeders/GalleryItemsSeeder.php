<?php

namespace Database\Seeders;

use App\Models\GalleryItem;
use Illuminate\Database\Seeder;

/**
 * Стартовые 6 элементов блока «Детали» на главной.
 * image_id пока null — админ загрузит через /admin/gallery.
 * До этого на фронте — фолбэк из public/images/media-bank/.
 */
class GalleryItemsSeeder extends Seeder
{
    public function run(): void
    {
        GalleryItem::query()->delete();

        $items = [
            [
                'caption' => 'Кладка 1883',
                'description' => 'Оригинальная кирпичная стена. Клеймо И. П. Летягина — в досягаемости руки, без стекла и рамы.',
                'alt_text' => 'Кирпичная кладка 1883 года',
                'category' => 'detail',
                'aspect' => 'square',
            ],
            [
                'caption' => 'Латунь и медь',
                'description' => 'Ручки, смесители, патина.',
                'alt_text' => 'Латунные детали отеля',
                'category' => 'detail',
                'aspect' => 'square',
            ],
            [
                'caption' => 'Тёплое дерево',
                'description' => 'Дуб в полах и мебели — часть помнит дореволюционных гостей, часть поставили при реновации 2024 года.',
                'alt_text' => 'Дубовый пол и мебель',
                'category' => 'interior',
                'aspect' => 'square',
            ],
            [
                'caption' => 'Винтажная ванна',
                'description' => 'Отреставрирована. Работает.',
                'alt_text' => 'Винтажная ванна в номере Авдотьи Библиевой',
                'category' => 'bath',
                'aspect' => 'square',
            ],
            [
                'caption' => 'Ткани и текстура',
                'description' => 'Лён, хлопок, грубая шерсть.',
                'alt_text' => 'Текстиль в интерьере',
                'category' => 'detail',
                'aspect' => 'square',
            ],
            [
                'caption' => 'Свет и пространство',
                'description' => 'Высокие потолки XIX века, дневной свет с двух сторон.',
                'alt_text' => 'Свет в историческом интерьере',
                'category' => 'interior',
                'aspect' => 'square',
            ],
        ];

        foreach ($items as $i => $item) {
            GalleryItem::create(array_merge($item, [
                'image_id' => null,    // админ загрузит
                'is_active' => true,
                'sort_order' => $i,
            ]));
        }
    }
}
