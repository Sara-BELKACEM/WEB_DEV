<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\HostController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// AUTH
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout',[AuthController::class,'logout']);

    // PODCASTS
    Route::get('/podcasts',[PodcastController::class,'index']);
    Route::get('/podcasts/{id}',[PodcastController::class,'show']);
    Route::post('/podcasts',[PodcastController::class,'store']);
    Route::put('/podcasts/{podcast}',[PodcastController::class,'update']);
    Route::delete('/podcasts/{podcast}',[PodcastController::class,'destroy']);

    // EPISODES
    Route::get('/podcasts/{id}/episodes',[EpisodeController::class,'indexByPodcast']);
    Route::get('/episodes/{id}',[EpisodeController::class,'show']);
    Route::post('/podcasts/{id}/episodes',[EpisodeController::class,'store']);
    Route::put('/episodes/{episode}',[EpisodeController::class,'update']);
    Route::delete('/episodes/{episode}',[EpisodeController::class,'destroy']);

    // HOSTS
    Route::get('/hosts',[HostController::class,'index']);
    Route::get('/hosts/{id}',[HostController::class,'show']);

    // ADMIN USERS
    Route::get('/users',[UserController::class,'index']);
    Route::post('/users',[UserController::class,'store']);
    Route::put('/users/{user}',[UserController::class,'update']);
    Route::delete('/users/{user}',[UserController::class,'destroy']);
});
