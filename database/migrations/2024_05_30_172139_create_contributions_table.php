<?php

use App\Models\Member;
use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contributions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Member::class)->nullable();
            $table->foreignIdFor(Project::class)->nullable();
            $table->string('description');
            $table->integer('amount');
            $table->date('date')->default(now());
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contributions');
    }
};
