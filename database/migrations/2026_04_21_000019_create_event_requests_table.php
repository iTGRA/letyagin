<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->string('phone', 60);
            $table->string('email', 200)->nullable();
            $table->string('event_type', 30);
            $table->date('event_date')->nullable();
            $table->unsignedSmallInteger('guests_count')->nullable();
            $table->text('comment')->nullable();
            $table->string('source', 80);
            $table->string('status', 20)->default('new');
            $table->text('admin_notes')->nullable();
            $table->string('ip', 45)->nullable();
            $table->string('user_agent', 500)->nullable();
            $table->timestamps();

            $table->index(['status', 'event_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_requests');
    }
};
