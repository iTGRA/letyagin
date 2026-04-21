<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;

/**
 * TeamMember — член команды отеля (шеф, менеджер, etc).
 * Сейчас нужен минимум — Иван Жуковкин (шеф-повар).
 */
class TeamMember extends Model
{
    use Attachable;

    protected $fillable = [
        'name', 'role', 'slug', 'bio', 'photo_id', 'facts',
        'is_featured', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'facts' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }

    public function scopeFeatured(Builder $q): Builder
    {
        return $q->where('is_featured', true)->where('is_active', true);
    }
}
