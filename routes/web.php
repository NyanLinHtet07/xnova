<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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

    Route::get('/assign-permissions', function(){
        return Inertia::render('Admin/RoleAndPermissions/AssignRoleAndPermission');
    })->name('admin.assign-role');

    Route::get('role-permission', function(){
        return Inertia::render('Admin/User/RoleAndPermission');
    })->name('admin.role-permission');

    Route::get('users', function(){
        return Inertia::render('Admin/User/UserListScreen');
    })->name('admin.users');

    Route::get('/user-role', function(){
        return Inertia::render('Admin/User/AdminUserAssignRole');
    })->name('admin.user-role');

    Route::get('/bar/{id}', function($id){
        return Inertia::render('Admin/Bars/BarDetailScreen', ['id' => $id]);
    })->name('admin.bar.detail');

    Route::get('/bar/{id}/promo', function($id){
        return Inertia::render('Admin/Bars/BarPromoIndexScreen', ['id' => $id]);
    })->name('admin.bar.promo');

    Route::get('/bar/{id}/review', function($id){
        return Inertia::render('Admin/Bars/BarReviewIndexScreen', ['id' => $id]);
    })->name('admin.bar.review');

    
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Route::middleware('api')->prefix('api')->group(base_path('routes/api.php'));
require __DIR__.'/auth.php';
