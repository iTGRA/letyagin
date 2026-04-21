<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 120)->unique();
            $table->string('name', 200);
            $table->string('category', 60);
            $table->unsignedSmallInteger('area_m2');
            $table->unsignedTinyInteger('guests');
            $table->boolean('extra_bed')->default(false);
            $table->string('view_text', 200)->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->json('features')->nullable();
            $table->boolean('is_quiet')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->unsignedBigInteger('hero_image_id')->nullable();
            $table->string('video_url', 500)->nullable();
            $table->string('seo_title', 255)->nullable();
            $table->string('seo_description', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['category', 'is_active', 'sort_order']);
            $table->index('is_featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
