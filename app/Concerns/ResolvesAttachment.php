<?php

namespace App\Concerns;

use Orchid\Attachment\Models\Attachment;

/**
 * Хелпер для резолва Orchid Attachment → URL.
 * Используется моделями, у которых есть поля вида hero_image_id, image_id, photo_id.
 *
 * Пример: getHeroImageUrlAttribute() { return $this->resolveAttachmentUrl($this->hero_image_id); }
 *
 * Кеширует внутри запроса, чтобы не делать 12 одинаковых SELECT'ов на главной.
 */
trait ResolvesAttachment
{
    private static array $attachmentUrlCache = [];

    public function resolveAttachmentUrl(?int $id): ?string
    {
        if (! $id) {
            return null;
        }
        if (! array_key_exists($id, self::$attachmentUrlCache)) {
            $a = Attachment::find($id);
            self::$attachmentUrlCache[$id] = $a?->url();
        }
        return self::$attachmentUrlCache[$id];
    }
}
