<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

/**
 * Живые цитаты из AUDIT.md §3.3 — реальные отзывы гостей на Яндексе.
 */
class ReviewsSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            [
                'author_name' => 'Анастасия',
                'source' => 'yandex',
                'rating' => 5,
                'text' => 'Номер был не просто чист, он был вылизан. Идеально чистое постельное бельё, 4 подушки и очень мягкий халат.',
                'topic' => 'service',
                'posted_at' => '2025-11-12',
                'is_featured' => true,
            ],
            [
                'author_name' => 'Татьяна Бондаренко',
                'source' => 'yandex',
                'rating' => 5,
                'text' => 'Администраторы замечательные! Не первый раз приезжаю в Самару и останавливаюсь только здесь!',
                'topic' => 'service',
                'posted_at' => '2025-10-28',
                'is_featured' => true,
            ],
            [
                'author_name' => 'Мария',
                'source' => 'yandex',
                'rating' => 5,
                'text' => 'Очень нравятся завтраки и ужины в ресторане Дуся. Очень вкусно и душевно.',
                'topic' => 'breakfast',
                'posted_at' => '2025-09-17',
                'is_featured' => true,
            ],
            [
                'author_name' => 'Иван П.',
                'source' => 'yandex',
                'rating' => 5,
                'text' => 'Теперь, проезжая Самару, я точно знаю, где остановлюсь!',
                'topic' => 'feeling',
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
                'is_featured' => true,
            ],
            [
                'author_name' => 'Сергей',
                'source' => 'twogis',
                'rating' => 5,
                'text' => 'Начну с основного, отель приятно удивил! До пешеходной улицы пройти всего через сквер.',
                'topic' => 'location',
                'posted_at' => '2025-05-14',
                'is_featured' => false,
            ],
            [
                'author_name' => 'Евгения',
                'source' => 'yandex',
                'rating' => 5,
                'text' => 'Очень понравился отель, 5+! Начиная с ресепшена, милые девушки встретили с улыбкой, очень вежливые и приветливые.',
                'topic' => 'service',
                'posted_at' => '2025-04-18',
                'is_featured' => true,
            ],
        ];

        foreach ($reviews as $i => $r) {
            Review::updateOrCreate(
                ['author_name' => $r['author_name'], 'posted_at' => $r['posted_at']],
                array_merge($r, ['is_active' => true, 'sort_order' => $i]),
            );
        }
    }
}
