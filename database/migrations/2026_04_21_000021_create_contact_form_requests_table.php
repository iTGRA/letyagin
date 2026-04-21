<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_form_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->string('phone', 60)->nullable();
            $table->string('email', 200)->nullable();
            $table->text('message');
            $table->string('source', 80);
            $table->string('status', 20)->default('new');
            $table->text('admin_notes')->nullable();
            $table->string('ip', 45)->nullable();
            $table->string('user_agent', 500)->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_form_requests');
    }
};
