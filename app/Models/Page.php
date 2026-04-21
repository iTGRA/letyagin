<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use App\Concerns\ResolvesAttachment;
use Orchid\Screen\AsSource;

/**
 * Page — SEO-метаданные и общие контентные строки для каждого URL.
 * 9 записей, slug зафиксированы в SEEDER. Через Orchid можно
 * редактировать, но НЕ создавать/удалять (защита от случайных URL).
 */
class Page extends Model
{
    use Attachable;
    use AsSource;
    use ResolvesAttachment;

    public const SLUGS = [
        '' => 'Главная',
        'rooms' => 'Номера',
        'restaurant' => 'Ресторан Дуся',
        'letyagin-hall' => 'ЛетягинЪ-Холл',
        'about' => 'О проекте',
        'nearby' => 'Лучшее рядом',
        'contacts' => 'Контакты',
        'corporate' => 'Корпоративный тариф',
    ];

    public const SCHEMA_TYPES = [
        'Hotel' => 'LodgingBusiness / Hotel',
        'Restaurant' => 'Restaurant',
        'Article' => 'Article',
        'Event' => 'Event',
        'Organization' => 'Organization',
    ];

    protected $fillable = [
        'slug', 'h1', 'meta_title', 'meta_description', 'og_image_id',
        'intro_text', 'extra', 'schema_type', 'is_active',
    ];

    protected $casts = [
        'extra' => 'array',
        'is_active' => 'boolean',
    ];

    /** Найти или создать страницу по slug (для контроллеров). */
    public static function forSlug(string $slug): self
    {
        return self::firstOrCreate(['slug' => $slug], ['is_active' => true]);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
    protected $appends = ['og_image_url'];

    public function getOgImageUrlAttribute(): ?string
    {
        return $this->resolveAttachmentUrl($this->og_image_id);
    }
}
