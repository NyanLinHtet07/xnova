<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BarData\BarDataAPIController;
use App\Http\Controllers\API\BarData\BarMenuAPIController;
use App\Http\Controllers\API\BarData\BarImageGalleryAPIController;
use App\Http\Controllers\API\Categroy\CategroyAPIController;
use App\Http\Controllers\API\BarData\BarPromoAPIController;
use App\Http\Controllers\API\BarData\BarMenuItemsAPIController;
use App\Http\Controllers\API\Role\RolePermissionController;
use App\Http\Controllers\API\Admin\UserAPIController;
use App\Http\Controllers\API\Role\PermissionAPIController;
use App\Http\Controllers\API\Role\RoleAPIController;
use App\Http\Controllers\API\EarthQuick\HelpRequestAPIController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\API\User\UserReviewAPIController;


//Route for auth
Route::post('/user/register', [RegisteredUserController::class, 'apiRegister']);
Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin']);
Route::post('/logout', [AuthenticatedSessionController::class, 'apiLogout'])->middleware('auth:sanctum');
Route::put('/users/{userId}/generate-qr', [UserAPIController::class, 'generateQr']);
Route::put('/user/{userId}/update', [UserAPIController::class, 'updateUser']);

Route::resource('users', UserAPIController::class);
Route::resource('roles', RoleAPIController::class);
Route::resource('permissions', PermissionAPIController::class);

Route::apiResource('bars', BarDataAPIController::class);
Route::apiResource('menus', BarMenuAPIController::class);
Route::apiResource('categories', CategroyAPIController::class);
Route::apiResource('bar/gallery', BarImageGalleryAPIController::class);
Route::apiResource('bar/promo', BarPromoAPIController::class);
Route::apiResource('bar/menu/items', BarMenuItemsAPIController::class);
Route::apiResource('earthquick/help-request', HelpRequestAPIController::class);
Route::apiResource('bar/user/review', UserReviewAPIController::class);


Route::post('users/{id}/assign-role', [UserAPIController::class, 'assignRole'])->name('user.assignRole');

Route::get('/covers', [BarPromoAPIController::class, 'promoListCover']);
Route::get('bar/gallery/by-bar/{barID}', [BarImageGalleryAPIController::class, 'getDataByBar']);
Route::post('import/barData', [BarDataAPIController::class, 'importDataBtExcel']);
Route::put('bar/{barID}/update-amenties', [BarDataAPIController::class, 'updateAmenties']);
//Route::get('menus/by-bar/{id}', BarMenuAPIController::class, 'getMenuByBars');
Route::get('bar/promo/by-bar/{barID}', [BarPromoAPIController::class, 'promoListByBar']);
Route::get('bar/menu/by-bar/{barID}', [BarMenuAPIController::class, 'getMenuByBars']);
Route::get('bar/list/by-name', [BarDataAPIController::class, 'getListByName']);


// Route::get('roles', [RolePermissionController::class, 'getRoles']);
Route::get('permissions', [RolePermissionController::class, 'getPermissions']);
Route::get('assign-roles', [RolePermissionController::class, 'assignRoles']);

Route::get('bars/{barID}/reviews', [UserReviewAPIController::class, 'getBarReview']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/mobile/user/review', [UserReviewAPIController::class, 'store'])->middleware('auth:sanctum');
Route::put('/user/data/{userID}/update', [UserAPIController::class, 'updateUser'])->middleware('auth:sanctum');