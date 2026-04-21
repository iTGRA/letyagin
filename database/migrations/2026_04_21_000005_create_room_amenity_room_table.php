<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_amenity_room', function (Blueprint $table) {
            $table->foreignId('room_id')->constrained('rooms')->cascadeOnDelete();
            $table->foreignId('room_amenity_id')->constrained('room_amenities')->cascadeOnDelete();

            $table->primary(['room_id', 'room_amenity_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_amenity_room');
    }
};
