<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMembersSeeder extends Seeder
{
    public function run(): void
    {
        TeamMember::updateOrCreate(
            ['slug' => 'ivan-zhukovkin'],
            [
                'name' => 'Иван Жуковкин',
                'role' => 'Шеф-повар ресторана «Дуся»',
                'bio' => 'Шеф авторской новой русской кухни. Полная биография и философия — появятся после получения контента от отеля.',
                'facts' => [
                    ['label' => 'Кухня',     'value' => 'Новая русская'],
                    ['label' => 'Ресторан',  'value' => '«Дуся»'],
                    ['label' => 'Рейтинг',   'value' => '#2 по завтракам в Самаре'],
                ],
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 0,
            ],
        );
    }
}
