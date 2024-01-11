<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;


Route::post("register", [AuthController::class, 'register']);
Route::post("login", [AuthController::class, 'login']);

// Route::group(['middleware' => 'api'], function ($router) {
//     Route::group(['middleware' => 'auth:api'], function ($router) {
//         Route::get("profile", [AuthController::class, 'profile']);
//         Route::post("logout", [AuthController::class, 'logout']);
//     });
// });

// Protected routes
Route::middleware(['api', 'auth:api'])->group(function () {
    Route::get('profile', [AuthController::class, 'profile']);
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::get('tasks', [TaskController::class, 'index']);
Route::post('add-task', [TaskController::class, 'addTask']);
Route::put('update-task/{id}', [TaskController::class, 'updateTask']);
Route::delete("delete-task/{id}",[TaskController::class, 'deleteTask']);

