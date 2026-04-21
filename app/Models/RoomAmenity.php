<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * RoomAmenity — справочник удобств в номере (Кондиционер, Сейф, Wi-Fi, Фен...).
 */
class RoomAmenity extends Model
{
    
    use AsSource;protected $fillable = ['name', 'icon_name', 'sort_order', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function rooms(): BelongsToMany
    {
        return $this->belongsToMany(Room::class, 'room_amenity_room');
    }

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }
}
