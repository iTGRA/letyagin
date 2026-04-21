<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use App\Concerns\ResolvesAttachment;
use Orchid\Attachment\Attachable;
use Orchid\Screen\AsSource;

/**
 * HeroSlide — слайд главного Hero на /. Карусель 4-5 слайдов.
 * Первый слайд может быть видео (video_url) для будущих ревизий.
 */
class HeroSlide extends Model
{
    use Attachable;
    use AsSource;
    use ResolvesAttachment;

    protected $fillable = [
        'image_id', 'video_url', 'title', 'subtitle',
        'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveAttachmentUrl($this->image_id);
    }

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }
}
