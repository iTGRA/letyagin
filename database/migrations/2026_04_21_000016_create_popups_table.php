<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('popups', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_enabled')->default(false);
            $table->string('title', 200);
            $table->text('body');
            $table->unsignedBigInteger('image_id')->nullable();
            $table->string('cta_text', 200)->nullable();
            $table->string('cta_url', 500)->nullable();
            $table->string('trigger_type', 30)->default('on_load');
            $table->unsignedSmallInteger('delay_seconds')->default(0);
            $table->string('frequency', 30)->default('once_per_session');
            $table->timestamp('date_from')->nullable();
            $table->timestamp('date_to')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('popups');
    }
};
