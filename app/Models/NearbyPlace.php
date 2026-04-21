<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;

/**
 * NearbyPlace — место путеводителя для /nearby и блока «Лучшее рядом».
 * С расстоянием в метрах и временем пешком.
 */
class NearbyPlace extends Model
{
    use Attachable;

    protected $fillable = [
        'slug', 'name', 'category', 'description', 'image_id',
        'distance_m', 'walk_minutes', 'geo_lat', 'geo_lng',
        'url', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'distance_m' => 'integer',
        'walk_minutes' => 'integer',
        'geo_lat' => 'float',
        'geo_lng' => 'float',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public const CATEGORIES = [
        'culture' => 'Культура',
        'food' => 'Еда',
        'walks' => 'Прогулки',
        'shopping' => 'Шопинг',
        'arts' => 'Искусство',
        'other' => 'Другое',
    ];

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }

    public function scopeByCategory(Builder $q, string $cat): Builder
    {
        return $q->where('category', $cat);
    }
}
