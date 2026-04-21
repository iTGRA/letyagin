<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Faq — вопрос-ответ для блока FAQ (снятие возражений).
 * Включает шумные номера, парковку, детей, домашних животных, оплату.
 */
class Faq extends Model
{
    protected $table = 'faqs';

    protected $fillable = ['question', 'answer', 'sort_order', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }
}
