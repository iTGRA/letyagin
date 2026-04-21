<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

/**
 * 4 канонических отзыва из CONTENT.md §2 Блок 13 + бонус из AUDIT.
 * Эти — утверждены клиентом как избранные для главной.
 */
class ReviewsSeeder extends Seeder
{
    public function run(): void
    {
        Review::query()->delete();

        $reviews = [
            [
                'author_name' => 'Светлана',
                'source' => 'twogis',
                'rating' => 5,
                'text' => 'Номер был не просто чист — он был вылизан. Идеально чистое постельное бельё, 4 подушки и очень мягкий халат. В номере есть красивые фужеры, были приятно удивлены.',
                'topic' => 'service',
                'posted_at' => '2025-11-12',
                'is_featured' => true,
            ],
            [
                'author_name' => 'Татьяна Бондаренко',
                'source' => 'twogis',
                'rating' => 5,
                'text' => 'Прекрасный отель! Администраторы замечательные! Не первый раз приезжаю в Самару и останавливаюсь только здесь!',
                'topic' => 'feeling',
                'posted_at' => '2025-10-28',
                'is_featured' => true,
            ],
            [
                'author_name' => 'Лб',
                'source' => 'twogis',
                'rating' => 5,
                'text' => 'Номера чистые и уютные, классный интерьер, а завтраки просто чудесные! 👌🏼 Свежие, вкусные, красивые блюда! В общем, всё на высшем! Теперь проезжая Самару я точно знаю где остановлюсь!',
                'topic' => 'breakfast',
                'posted_at' => '2025-09-17',
                'is_featured' => true,
            ],
            [
                'author_name' => '«Как Есть»',
                'source' => 'manual',
                'rating' => 5,
                'text' => 'Здесь подают то, что давно забыли: грузди, драники, рассольник, тончайшее сало и домашние пирожки. Завтраки с 8:00, когда все ещё закрыто.',
                'topic' => 'breakfast',
                'posted_at' => '2025-08-22',
                'is_featured' => true,
            ],
            [
                'author_name' => 'Пётр Коликов',
                'source' => 'yandex',
                'rating' => 5,
                'text' => 'Очень уютная гостиница, крайне приятный персонал. Расположение так же очень удачное.',
                'topic' => 'location',
                'posted_at' => '2025-07-10',
                'is_featured' => false,
            ],
            [
                'author_name' => 'Наталья',
                'source' => 'yandex',
                'rating' => 5,
                'text' => 'Прекрасный отель! Внимание к мелочам подкупает особенно. Локация — лучше быть не может.',
                'topic' => 'feeling',
                'posted_at' => '2025-06-03',
                'is_featured' => false,
            ],
        ];

        foreach ($reviews as $i => $r) {
            Review::create(array_merge($r, ['is_active' => true, 'sort_order' => $i]));
        }
    }
}
