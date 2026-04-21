<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;

/**
 * Review — отзыв гостя. Импортируется с Яндекса/2ГИС или добавляется
 * вручную администратором через Orchid.
 */
class Review extends Model
{
    
    use AsSource;protected $fillable = [
        'author_name', 'source', 'source_url', 'rating', 'text', 'topic',
        'posted_at', 'is_featured', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'posted_at' => 'date',
        'rating' => 'integer',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public const SOURCES = [
        'yandex' => 'Яндекс',
        'twogis' => '2ГИС',
        'ostrovok' => 'Островок',
        '101hotels' => '101hotels',
        'manual' => 'Вручную',
    ];

    public const TOPICS = [
        'service' => 'Сервис',
        'breakfast' => 'Завтраки',
        'location' => 'Локация',
        'feeling' => 'Впечатление',
        'general' => 'Общее',
    ];

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }

    public function scopeFeatured(Builder $q): Builder
    {
        return $q->where('is_featured', true)->where('is_active', true)
            ->orderBy('sort_order');
    }

    public function scopeByTopic(Builder $q, string $topic): Builder
    {
        return $q->where('topic', $topic);
    }
}
