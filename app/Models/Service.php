<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Service — услуга отеля для блока «Услуги и удобства» на главной
 * (Wi-Fi, Парковка, Ресепшн 24/7, Бизнес-центр, Прачечная и т.п.).
 */
class Service extends Model
{
    protected $fillable = ['name', 'description', 'icon_name', 'sort_order', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }
}
