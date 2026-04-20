<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'siteName' => config('app.name'),
    ]);
})->name('home');

Route::get('/lab', function () {
    return Inertia::render('Lab');
})->name('lab');
