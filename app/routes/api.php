<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ReleaseController;
use App\Http\Controllers\API\ProjectController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'userRegister']);
    Route::post('/login', [AuthController::class, 'loginUser']);
});

Route::group([
    'middleware' => ['auth:api'],
    'prefix' => 'auth'], function () {
    Route::get('/check',[\App\Http\Controllers\FrontController::class,'check']);
    Route::get('/logout',[\App\Http\Controllers\FrontController::class,'logout']);

    Route::post('change-password', [AuthController::class, 'changePasswordUser']);

});

Route::group([
    'middleware' => ['auth:api'],
    'prefix' => 'release'], function () {
    Route::post('/create',[ReleaseController::class,'create']);

});

Route::group([
    'prefix' => 'release'], function () {


    Route::get('/',[ReleaseController::class,'getReleases']);
    Route::get('{id}',[ReleaseController::class,'getReleaseDetail']);
});


Route::group([
//    'middleware' => ['auth:api'],
    'prefix' => 'project'], function () {
    Route::get('/',[ProjectController::class,'getProjects']);
});
