<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::get('tasks', [TaskController::class, 'index']);
// Route::post('tasks', [TaskController::class, 'store']);
// Route::put('tasks/{id}', [TaskController::class, 'update']);
// Route::get('tasks/{id}', [TaskController::class, 'show']);
// Route::delete('tasks/{id}', [TaskController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('profile', [ProfileController::class, 'store']);
    Route::get('profile/{id}', [ProfileController::class, 'show']);

    Route::get('user/{id}/profile', [UserController::class, 'getProfile']);
    Route::get('user/{id}/tasks', [UserController::class, 'getUserTasks']);

    Route::apiResource('tasks', TaskController::class);
    Route::get('task/all', [TaskController::class, 'getAllTasks'])->middleware('CheckUser');
    Route::get('tasks/ordered', [TaskController::class, 'getTasksByPriority']);


    Route::get('task/{id}/user', [TaskController::class, 'getTasksUser']);
    Route::post('tasks/{taskId}/categories', [TaskController::class, 'addCategoriesToTask']);
    Route::get('tasks/{taskId}/categories', [TaskController::class, 'getTaskCategories']);

    Route::post('task/{taskId}/favorite', [TaskController::class, 'addToFavorites']);
    Route::delete('task/{taskId}/favorite', [TaskController::class, 'removeFromFavorites']);
    Route::get('task/favorites', [TaskController::class, 'getFavoritesTasks']);
});

    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'logIn']);
    Route::post('logout', [UserController::class, 'logOut'])->middleware('auth:sanctum');
