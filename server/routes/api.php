<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

Route::group([
    'middleware' => 'is.admin',
    'prefix' => 'category'
], function ($router) {
    Route::post('/create', [CategoryController::class, 'create']);
    Route::delete('/delete/{id}',[CategoryController::class, 'delete']);
    Route::put('/update/{id}',[CategoryController::class, 'update']);
});

Route::group([
    'prefix' => 'category'
], function ($router) {
    Route::get('/get', [CategoryController::class, 'getAll']);
    Route::get('/get/{id}', [CategoryController::class, 'getSingle']);
});

Route::group([
    'middleware' => 'is.admin',
    'prefix' => 'product'
], function ($router) {
    Route::post('/create', [ProductController::class, 'create']);
});

Route::group([
    'prefix' => 'product'
], function ($router) {
    Route::get('/get-random/{number}', [ProductController::class, 'getRandom']);
    Route::get('/get-by-category/{categoryId}', [ProductController::class, 'getByCategory']);
});