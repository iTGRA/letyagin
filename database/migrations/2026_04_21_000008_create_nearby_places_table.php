<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nearby_places', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 120)->unique();
            $table->string('name', 200);
            $table->string('category', 30);
            $table->text('description')->nullable();
            $table->unsignedBigInteger('image_id')->nullable();
            $table->unsignedInteger('distance_m')->nullable();
            $table->unsignedTinyInteger('walk_minutes')->nullable();
            $table->decimal('geo_lat', 9, 6)->nullable();
            $table->decimal('geo_lng', 9, 6)->nullable();
            $table->string('url', 500)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['category', 'is_active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nearby_places');
    }
};
