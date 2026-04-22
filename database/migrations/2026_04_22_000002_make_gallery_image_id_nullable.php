<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gallery_items', function (Blueprint $table) {
            $table->unsignedBigInteger('image_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('gallery_items', function (Blueprint $table) {
            $table->unsignedBigInteger('image_id')->nullable(false)->change();
        });
    }
};
