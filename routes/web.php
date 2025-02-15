<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BarData\BarDataAPIController;
use App\Http\Controllers\API\BarData\BarMenuAPIController;
use App\Http\Controllers\API\BarData\BarImageGalleryAPIController;
use App\Http\Controllers\API\Categroy\CategroyAPIController;
use App\Http\Controllers\API\BarData\BarPromoAPIController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function(){
        return Inertia::render('Admin/AdminHomeScreen');
    })->name('admin.dashboard');

    Route::get('/category', function(){
        return Inertia::render('Admin/Category/CategoryIndex');
    })->name('admin.category');

    Route::get('/bar/covers', function(){
        return Inertia::render('Admin/Promotions/PromotionCoverIndex');
    })->name('admin.promos.cover');

    Route::get('/bar/create', function(){
        return Inertia::render('Admin/Bars/BarCreateScreen');
    })->name('admin.create-bar');

    Route::get('/bar/import', function(){
        return Inertia::render('Admin/Bars/BarImportScreen');
    })->name('admin.import-bar');

    Route::get('/bars', function(){
        return Inertia::render('Admin/Bars/BarListScreen');
    })->name('admin.bars');

    Route::get('/bar/{id}', function($id){
        return Inertia::render('Admin/Bars/BarDetailScreen', ['id' => $id]);
    })->name('admin.bar.detail');

    Route::get('/bar/{id}/promo', function($id){
        return Inertia::render('Admin/Bars/BarPromoIndexScreen', ['id' => $id]);
    })->name('admin.bar.promo');

    
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
    Route::apiResource('bars', BarDataAPIController::class);
    Route::apiResource('menus', BarMenuAPIController::class);
    Route::apiResource('categories', CategroyAPIController::class);
    Route::apiResource('bar/gallery', BarImageGalleryAPIController::class);
    Route::apiResource('bar/promo', BarPromoAPIController::class);


    Route::get('/covers', [BarPromoAPIController::class, 'promoListCover']);
    Route::get('bar/gallery/by-bar/{barID}', [BarImageGalleryAPIController::class, 'getDataByBar']);
    Route::post('import/barData', [BarDataAPIController::class, 'importDataBtExcel']);
    Route::put('bar/{barID}/update-amenties', [BarDataAPIController::class, 'updateAmenties']);
    //Route::get('menus/by-bar/{id}', BarMenuAPIController::class, 'getMenuByBars');
    Route::get('bar/promo/by-bar/{barID}', [BarPromoAPIController::class, 'promoListByBar']);
    Route::get('bar/list/by-name', [BarDataAPIController::class, 'getListByName']);
    
});

require __DIR__.'/auth.php';
