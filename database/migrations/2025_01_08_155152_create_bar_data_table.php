<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bar_data', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('owner_id')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('cover')->nullable();
            $table->json('images')->nullable();
            $table->string('opening_time')->nullable();
            $table->longText('description')->nullable();
            $table->string('location_lat')->nullable();
            $table->string('location_long')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bar_data');
    }
};
