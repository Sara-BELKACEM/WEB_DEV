<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\API\UserController;


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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });




Route::get('/sanctum/csrf-cookie', function(){ return response()->json(['ok'=>true]); });

// Public
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

// Protected (session cookie)
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/user',[AuthController::class,'me']);
    // User endpoints
    Route::get('/appointments/my',[AppointmentController::class,'my']);
    Route::post('/appointments',[AppointmentController::class,'store']);
    Route::delete('/appointments/{id}',[AppointmentController::class,'cancel']);

    // Admin routes - middleware isAdmin
    Route::middleware('admin')->group(function(){
        Route::get('/appointments',[AppointmentController::class,'index']);
        Route::patch('/appointments/{id}/status',[AppointmentController::class,'changeStatus']);
        Route::get('/users',[UserController::class,'index']);
    });
});
