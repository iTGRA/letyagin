<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('author_name', 200);
            $table->string('source', 30);
            $table->string('source_url', 500)->nullable();
            $table->unsignedTinyInteger('rating')->nullable();
            $table->text('text');
            $table->string('topic', 60)->nullable();
            $table->date('posted_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'is_featured', 'sort_order']);
            $table->index('source');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
