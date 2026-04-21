<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('history_milestones', function (Blueprint $table) {
            $table->id();
            $table->string('year_label', 30);
            $table->string('headline', 200);
            $table->text('body');
            $table->unsignedBigInteger('image_id')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('history_milestones');
    }
};
