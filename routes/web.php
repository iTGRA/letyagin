<?php

use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\ContactsController;
use App\Http\Controllers\Public\CorporateController;
use App\Http\Controllers\Public\HallController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\NearbyController;
use App\Http\Controllers\Public\RestaurantController;
use App\Http\Controllers\Public\RoomsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Публичные маршруты
|--------------------------------------------------------------------------
*/

Route::get('/',                   HomeController::class)->name('home');
Route::get('/rooms',              [RoomsController::class, 'index'])->name('rooms.index');
Route::get('/rooms/{room:slug}',  [RoomsController::class, 'show'])->name('rooms.show');
Route::get('/restaurant',         RestaurantController::class)->name('restaurant');
Route::get('/letyagin-hall',      HallController::class)->name('hall');
Route::get('/about',              AboutController::class)->name('about');
Route::get('/nearby',             NearbyController::class)->name('nearby');
Route::get('/contacts',           ContactsController::class)->name('contacts');
Route::get('/corporate',          CorporateController::class)->name('corporate');

// Временная страница — стайл-гид. Удалим перед прод-запуском (D8).
Route::get('/lab', fn () => Inertia::render('Lab'))->name('lab');

/*
|--------------------------------------------------------------------------
| API форм — с throttle 5/мин на IP
|--------------------------------------------------------------------------
*/

Route::prefix('api/forms')->middleware('throttle:5,1')->group(function () {
    Route::post('table-booking',  \App\Http\Controllers\Forms\TableBookingController::class)->name('forms.table-booking');
    Route::post('event',          \App\Http\Controllers\Forms\EventRequestController::class)->name('forms.event');
    Route::post('corporate',      \App\Http\Controllers\Forms\CorporateRequestController::class)->name('forms.corporate');
    Route::post('contact',        \App\Http\Controllers\Forms\ContactController::class)->name('forms.contact');
});
