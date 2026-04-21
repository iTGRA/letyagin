<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;

/**
 * RestaurantMenuItem — блюдо ресторана «Дуся».
 * price_hint — строка ('от 650 ₽' или пусто) — цены не точные.
 */
class RestaurantMenuItem extends Model
{
    use Attachable;

    protected $fillable = [
        'name', 'category', 'description', 'price_hint', 'image_id',
        'is_featured', 'is_available', 'sort_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_available' => 'boolean',
        'sort_order' => 'integer',
    ];

    public const CATEGORIES = [
        'breakfast' => 'Завтраки',
        'starter' => 'Закуски',
        'soup' => 'Супы',
        'main' => 'Горячее',
        'dessert' => 'Десерты',
        'drink' => 'Напитки',
        'other' => 'Другое',
    ];

    public function scopeAvailable(Builder $q): Builder
    {
        return $q->where('is_available', true)->orderBy('sort_order');
    }

    public function scopeFeatured(Builder $q): Builder
    {
        return $q->where('is_featured', true)->where('is_available', true)
            ->orderBy('sort_order');
    }
}
