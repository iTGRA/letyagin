<?php

declare(strict_types=1);

use App\Orchid\Screens\Announcement\AnnouncementScreen;
use App\Orchid\Screens\Dashboard\DashboardScreen;
use App\Orchid\Screens\Faqs\FaqEditScreen;
use App\Orchid\Screens\Faqs\FaqListScreen;
use App\Orchid\Screens\GalleryItems\GalleryItemEditScreen;
use App\Orchid\Screens\GalleryItems\GalleryItemListScreen;
use App\Orchid\Screens\HeroSlides\HeroSlideEditScreen;
use App\Orchid\Screens\HeroSlides\HeroSlideListScreen;
use App\Orchid\Screens\HistoryMilestones\HistoryMilestoneEditScreen;
use App\Orchid\Screens\HistoryMilestones\HistoryMilestoneListScreen;
use App\Orchid\Screens\NearbyPlaces\NearbyPlaceEditScreen;
use App\Orchid\Screens\NearbyPlaces\NearbyPlaceListScreen;
use App\Orchid\Screens\Pages\PageEditScreen;
use App\Orchid\Screens\Pages\PageListScreen;
use App\Orchid\Screens\Popup\PopupScreen;
use App\Orchid\Screens\Requests\ContactFormEditScreen;
use App\Orchid\Screens\Requests\ContactFormListScreen;
use App\Orchid\Screens\Requests\CorporateRequestEditScreen;
use App\Orchid\Screens\Requests\CorporateRequestListScreen;
use App\Orchid\Screens\Requests\EventRequestEditScreen;
use App\Orchid\Screens\Requests\EventRequestListScreen;
use App\Orchid\Screens\Requests\TableBookingEditScreen;
use App\Orchid\Screens\Requests\TableBookingListScreen;
use App\Orchid\Screens\RestaurantMenuItems\RestaurantMenuItemEditScreen;
use App\Orchid\Screens\RestaurantMenuItems\RestaurantMenuItemListScreen;
use App\Orchid\Screens\Reviews\ReviewEditScreen;
use App\Orchid\Screens\Reviews\ReviewListScreen;
use App\Orchid\Screens\RoomAmenities\RoomAmenityEditScreen;
use App\Orchid\Screens\RoomAmenities\RoomAmenityListScreen;
use App\Orchid\Screens\Rooms\RoomEditScreen;
use App\Orchid\Screens\Rooms\RoomListScreen;
use App\Orchid\Screens\Services\ServiceEditScreen;
use App\Orchid\Screens\Services\ServiceListScreen;
use App\Orchid\Screens\SiteSettings\SiteSettingsScreen;
use App\Orchid\Screens\TeamMembers\TeamMemberEditScreen;
use App\Orchid\Screens\TeamMembers\TeamMemberListScreen;
use App\Orchid\Screens\Role\RoleEditScreen;
use App\Orchid\Screens\Role\RoleListScreen;
use App\Orchid\Screens\User\UserEditScreen;
use App\Orchid\Screens\User\UserListScreen;
use App\Orchid\Screens\User\UserProfileScreen;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Dashboard Routes (admin/*)
|--------------------------------------------------------------------------
*/

// Главный дашборд ЛетягинЪ
Route::screen('/main', DashboardScreen::class)->name('platform.main');

// Профиль
Route::screen('profile', UserProfileScreen::class)->name('platform.profile');

// Пользователи и роли (системные, из коробки Orchid)
Route::screen('users/{user}/edit', UserEditScreen::class)->name('platform.systems.users.edit');
Route::screen('users/create',      UserEditScreen::class)->name('platform.systems.users.create');
Route::screen('users',             UserListScreen::class)->name('platform.systems.users');
Route::screen('roles/{role}/edit', RoleEditScreen::class)->name('platform.systems.roles.edit');
Route::screen('roles/create',      RoleEditScreen::class)->name('platform.systems.roles.create');
Route::screen('roles',             RoleListScreen::class)->name('platform.systems.roles');

// ─── КОНТЕНТ ────────────────────────────────────────────────────────────

// Hero-слайды
Route::screen('hero-slides',                    HeroSlideListScreen::class)->name('platform.hero-slides');
Route::screen('hero-slides/create',             HeroSlideEditScreen::class)->name('platform.hero-slides.create');
Route::screen('hero-slides/{heroSlide}/edit',   HeroSlideEditScreen::class)->name('platform.hero-slides.edit');

// Номера
Route::screen('rooms',                RoomListScreen::class)->name('platform.rooms');
Route::screen('rooms/create',         RoomEditScreen::class)->name('platform.rooms.create');
Route::screen('rooms/{room}/edit',    RoomEditScreen::class)->name('platform.rooms.edit');

// Удобства в номерах (справочник)
Route::screen('room-amenities',                       RoomAmenityListScreen::class)->name('platform.room-amenities');
Route::screen('room-amenities/create',                RoomAmenityEditScreen::class)->name('platform.room-amenities.create');
Route::screen('room-amenities/{roomAmenity}/edit',    RoomAmenityEditScreen::class)->name('platform.room-amenities.edit');

// Услуги отеля
Route::screen('services',                   ServiceListScreen::class)->name('platform.services');
Route::screen('services/create',            ServiceEditScreen::class)->name('platform.services.create');
Route::screen('services/{service}/edit',    ServiceEditScreen::class)->name('platform.services.edit');

// Места рядом
Route::screen('nearby-places',                      NearbyPlaceListScreen::class)->name('platform.nearby-places');
Route::screen('nearby-places/create',               NearbyPlaceEditScreen::class)->name('platform.nearby-places.create');
Route::screen('nearby-places/{nearbyPlace}/edit',   NearbyPlaceEditScreen::class)->name('platform.nearby-places.edit');

// Меню ресторана
Route::screen('menu-items',                             RestaurantMenuItemListScreen::class)->name('platform.menu-items');
Route::screen('menu-items/create',                      RestaurantMenuItemEditScreen::class)->name('platform.menu-items.create');
Route::screen('menu-items/{restaurantMenuItem}/edit',   RestaurantMenuItemEditScreen::class)->name('platform.menu-items.edit');

// Команда
Route::screen('team-members',                       TeamMemberListScreen::class)->name('platform.team-members');
Route::screen('team-members/create',                TeamMemberEditScreen::class)->name('platform.team-members.create');
Route::screen('team-members/{teamMember}/edit',     TeamMemberEditScreen::class)->name('platform.team-members.edit');

// Галерея деталей
Route::screen('gallery',                        GalleryItemListScreen::class)->name('platform.gallery');
Route::screen('gallery/create',                 GalleryItemEditScreen::class)->name('platform.gallery.create');
Route::screen('gallery/{galleryItem}/edit',     GalleryItemEditScreen::class)->name('platform.gallery.edit');

// Отзывы
Route::screen('reviews',                    ReviewListScreen::class)->name('platform.reviews');
Route::screen('reviews/create',             ReviewEditScreen::class)->name('platform.reviews.create');
Route::screen('reviews/{review}/edit',      ReviewEditScreen::class)->name('platform.reviews.edit');

// FAQ
Route::screen('faqs',                FaqListScreen::class)->name('platform.faqs');
Route::screen('faqs/create',         FaqEditScreen::class)->name('platform.faqs.create');
Route::screen('faqs/{faq}/edit',     FaqEditScreen::class)->name('platform.faqs.edit');

// История — таймлайн
Route::screen('history-milestones',                             HistoryMilestoneListScreen::class)->name('platform.history-milestones');
Route::screen('history-milestones/create',                      HistoryMilestoneEditScreen::class)->name('platform.history-milestones.create');
Route::screen('history-milestones/{historyMilestone}/edit',     HistoryMilestoneEditScreen::class)->name('platform.history-milestones.edit');

// Страницы (SEO)
Route::screen('pages',                  PageListScreen::class)->name('platform.pages');
Route::screen('pages/{page}/edit',      PageEditScreen::class)->name('platform.pages.edit');

// Singletons
Route::screen('announcement',   AnnouncementScreen::class)->name('platform.announcement');
Route::screen('popup',          PopupScreen::class)->name('platform.popup');
Route::screen('site-settings',  SiteSettingsScreen::class)->name('platform.site-settings');

// ─── ЗАЯВКИ ─────────────────────────────────────────────────────────────

Route::screen('requests/table-booking',                          TableBookingListScreen::class)->name('platform.requests.table-booking');
Route::screen('requests/table-booking/{tableBookingRequest}/edit', TableBookingEditScreen::class)->name('platform.requests.table-booking.edit');

Route::screen('requests/event',                              EventRequestListScreen::class)->name('platform.requests.event');
Route::screen('requests/event/{eventRequest}/edit',          EventRequestEditScreen::class)->name('platform.requests.event.edit');

Route::screen('requests/corporate',                              CorporateRequestListScreen::class)->name('platform.requests.corporate');
Route::screen('requests/corporate/{corporateRequest}/edit',      CorporateRequestEditScreen::class)->name('platform.requests.corporate.edit');

Route::screen('requests/contact',                                ContactFormListScreen::class)->name('platform.requests.contact');
Route::screen('requests/contact/{contactFormRequest}/edit',      ContactFormEditScreen::class)->name('platform.requests.contact.edit');
