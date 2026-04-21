<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use App\Concerns\ResolvesAttachment;
use Orchid\Screen\AsSource;

/**
 * GalleryItem — фото для блока «Галерея деталей» (клеймо, интерьер,
 * винтажная ванная, кирпичная кладка, ткани, терраса).
 * Aspect ratio определяет позицию в masonry/asymmetric grid.
 */
class GalleryItem extends Model
{
    use Attachable;
    use AsSource;
    use ResolvesAttachment;

    protected $fillable = [
        'image_id', 'alt_text', 'caption', 'category',
        'aspect', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public const ASPECTS = [
        'tall' => 'Вертикальный',
        'wide' => 'Горизонтальный',
        'square' => 'Квадратный',
    ];

    public const CATEGORIES = [
        'interior' => 'Интерьер',
        'detail' => 'Деталь',
        'terrace' => 'Терраса',
        'bath' => 'Ванная',
        'restaurant' => 'Ресторан',
        'exterior' => 'Фасад',
    ];

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveAttachmentUrl($this->image_id);
    }
}
