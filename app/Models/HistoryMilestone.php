<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use Orchid\Screen\AsSource;

/**
 * HistoryMilestone — веха в таймлайне истории особняка
 * (1883 постоялый двор → 1917 Авдотья → 2023 клеймо → 2024 реновация).
 */
class HistoryMilestone extends Model
{
    use Attachable;
    use AsSource;

    protected $fillable = [
        'year_label', 'headline', 'body', 'image_id',
        'sort_order', 'is_active',
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
