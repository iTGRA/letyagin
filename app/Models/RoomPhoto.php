<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Orchid\Attachment\Attachable;

/**
 * RoomPhoto — фото в галерее номера (one-to-many к Room).
 */
class RoomPhoto extends Model
{
    use Attachable;

    protected $fillable = ['room_id', 'image_id', 'alt_text', 'sort_order'];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
