<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Orchid\Attachment\Attachable;

/**
 * Room — номер отеля. 19 физических номеров = 19 уникальных записей.
 * Каждый имеет свой slug и публичную страницу /rooms/{slug}.
 */
class Room extends Model
{
    use Attachable;

    protected $fillable = [
        'slug', 'name', 'category', 'area_m2', 'guests', 'extra_bed',
        'view_text', 'short_description', 'description', 'features',
        'is_quiet', 'is_featured', 'hero_image_id', 'video_url',
        'seo_title', 'seo_description', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'features' => 'array',
        'extra_bed' => 'boolean',
        'is_quiet' => 'boolean',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'area_m2' => 'integer',
        'guests' => 'integer',
        'sort_order' => 'integer',
    ];

    /** Перечисление категорий (валидируется на уровне FormRequest и Orchid). */
    public const CATEGORIES = [
        'standart' => 'Стандарт',
        'standart-single' => 'Стандарт одноместный',
        'comfort' => 'Комфорт',
        'comfort-twin' => 'Комфорт Твин',
        'junior-twin' => 'Джуниор Твин',
        'deluxe' => 'Делюкс',
        'avdotya' => 'Авдотьи Библиевой',
        'junior-suite' => 'Джуниор Сюит',
        'junior-semilux' => 'Джуниор полулюкс',
        'lux' => 'Люкс',
        'junior-suite-letyagin' => 'Джуниор Сюит ЛетягинЪ',
        'letyagin-lux' => 'ЛетягинЪ Люкс',
    ];

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(RoomAmenity::class, 'room_amenity_room')
            ->orderBy('sort_order');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(RoomPhoto::class)->orderBy('sort_order');
    }

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }

    public function scopeFeatured(Builder $q): Builder
    {
        return $q->where('is_featured', true)->where('is_active', true)
            ->orderBy('sort_order');
    }

    public function scopeByCategory(Builder $q, string $cat): Builder
    {
        return $q->where('category', $cat);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
