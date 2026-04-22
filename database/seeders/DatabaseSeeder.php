<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * Главный оркестратор. Порядок важен: справочники → их потребители.
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SiteSettingsSeeder::class,
            PagesSeeder::class,
            RoomAmenitiesSeeder::class,
            RoomsSeeder::class,
            ServicesSeeder::class,
            NearbyPlacesSeeder::class,
            ReviewsSeeder::class,
            FaqsSeeder::class,
            HistoryMilestonesSeeder::class,
            TeamMembersSeeder::class,
            RestaurantMenuItemsSeeder::class,
            GalleryItemsSeeder::class,
            SingletonsSeeder::class,
        ]);
    }
}
