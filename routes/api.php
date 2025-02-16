<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\BarData\BarDataAPIController;
use App\Http\Controllers\API\BarData\BarMenuAPIController;
use App\Http\Controllers\API\BarData\BarImageGalleryAPIController;
use App\Http\Controllers\API\Categroy\CategroyAPIController;
use App\Http\Controllers\API\BarData\BarPromoAPIController;
use App\Http\Controllers\API\BarData\BarMenuItemsAPIController;

Route::apiResource('bars', BarDataAPIController::class);
Route::apiResource('menus', BarMenuAPIController::class);
Route::apiResource('categories', CategroyAPIController::class);
Route::apiResource('bar/gallery', BarImageGalleryAPIController::class);
Route::apiResource('bar/promo', BarPromoAPIController::class);
Route::apiResource('bar/menu/items', BarMenuItemsAPIController::class);

Route::get('/covers', [BarPromoAPIController::class, 'promoListCover']);
Route::get('bar/gallery/by-bar/{barID}', [BarImageGalleryAPIController::class, 'getDataByBar']);
Route::post('import/barData', [BarDataAPIController::class, 'importDataBtExcel']);
Route::put('bar/{barID}/update-amenties', [BarDataAPIController::class, 'updateAmenties']);
//Route::get('menus/by-bar/{id}', BarMenuAPIController::class, 'getMenuByBars');
Route::get('bar/promo/by-bar/{barID}', [BarPromoAPIController::class, 'promoListByBar']);
Route::get('bar/menu/by-bar/{barID}', [BarMenuAPIController::class, 'getMenuByBars']);
Route::get('bar/list/by-name', [BarDataAPIController::class, 'getListByName']);