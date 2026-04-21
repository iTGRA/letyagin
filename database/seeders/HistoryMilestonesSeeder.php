<?php

namespace Database\Seeders;

use App\Models\HistoryMilestone;
use Illuminate\Database\Seeder;

/**
 * 5 вех из CONTENT.md §2 Блок 11 (финальная хронология).
 * 150 лет гостеприимства на одном адресе.
 */
class HistoryMilestonesSeeder extends Seeder
{
    public function run(): void
    {
        HistoryMilestone::query()->delete();

        $milestones = [
            [
                'year_label' => '1874',
                'headline' => 'Мещанин Пономарёв строит усадьбу',
                'body' => 'Фасад по «образцовому» проекту, вид на Троицкую церковь. Квартал начинает застраиваться.',
            ],
            [
                'year_label' => '1883',
                'headline' => 'Постоялый двор Сидоровых и Библиевых',
                'body' => 'Одна из ключевых гостиниц Самары — здесь останавливались купцы, приезжавшие на Троицкий рынок. Работает до 1922 года.',
            ],
            [
                'year_label' => '1930-е',
                'headline' => 'Дом колхозника',
                'body' => 'Советская эпоха: в здании живут приезжавшие в город сельские жители. Гостиничный профиль не прерывается — только меняется клиент.',
            ],
            [
                'year_label' => '1991',
                'headline' => 'Гостиница «Колос»',
                'body' => 'Капитальный ремонт, новая вывеска. Очередная эпоха в той же роли — принимать гостей города.',
            ],
            [
                'year_label' => '2024',
                'headline' => 'Бутик-отель ЛетягинЪ',
                'body' => 'Реновация, найдено клеймо Летягина в кладке. 19 номеров, ресторан «Дуся», конференц-зал.',
            ],
        ];

        foreach ($milestones as $i => $m) {
            HistoryMilestone::create(array_merge($m, ['sort_order' => $i, 'is_active' => true]));
        }
    }
}
