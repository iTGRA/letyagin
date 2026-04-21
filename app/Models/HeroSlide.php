<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;

/**
 * HeroSlide — слайд главного Hero на /. Карусель 4-5 слайдов.
 * Первый слайд может быть видео (video_url) для будущих ревизий.
 */
class HeroSlide extends Model
{
    use Attachable;

    protected $fillable = [
        'image_id', 'video_url', 'title', 'subtitle',
        'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }
}
