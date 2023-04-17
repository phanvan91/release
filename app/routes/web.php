<?php

use App\Http\Controllers\FrontController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [FrontController::class, 'index']);
Route::get('/release/{id}/{title}', [FrontController::class, 'detail']);
Route::get('/upload', [FrontController::class, 'upload']);
Route::get('login', [FrontController::class, 'login'])->name('login');

Route::get('/change-password',[FrontController::class, 'changePassword']);

//Route::post('/auth/login', [FrontController::class, 'loginProcess']);
