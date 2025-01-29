<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BarDataAPIController;
use App\Http\Controllers\API\BarData\BarMenuAPIController;
use App\Http\Controllers\API\Categroy\CategroyAPIController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/', function (){
//     return redirect('/login');
// });

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function(){
        return Inertia::render('Admin/AdminHomeScreen');
    })->name('admin.dashboard');

    Route::get('/category', function(){
        return Inertia::render('Admin/Category/CategoryIndex');
    })->name('admin.category');

    Route::get('/bar/create', function(){
        return Inertia::render('Admin/Bars/BarCreateScreen');
    })->name('admin.create-bar');

    Route::get('/bars', function(){
        return Inertia::render('Admin/Bars/BarListScreen');
    })->name('admin.bars');

    Route::get('/bar/{id}', function($id){
        return Inertia::render('Admin/Bars/BarDetailScreen', ['id' => $id]);
    })->name('admin.bar.detail');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Admin/AdminHomeScreen');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('api')->middleware('api')->group(function (){
    Route::resource('bars', BarDataAPIController::class);
    Route::apiResource('menus', BarMenuAPIController::class);
    Route::apiResource('categories', CategroyAPIController::class);
    //Route::get('menus/by-bar/{id}', BarMenuAPIController::class, 'getMenuByBars');
});

require __DIR__.'/auth.php';
