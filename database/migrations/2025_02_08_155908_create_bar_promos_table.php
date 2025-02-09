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
        Schema::create('bar_promos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bar_id')->nullable();
            $table->string('image');
            $table->longText('description')->nullable();
            $table->date('start_promo')->nullable();
            $table->date('end_promo')->nullable();
            $table->integer('is_active')->default(1);
            $table->integer('is_cover')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bar_promos');
    }
};
