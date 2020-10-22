<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:sanctum')->group(function () {

	Route::get('/posts/{post}','PostsController@show');
	Route::get('/posts','PostsController@index');
	Route::patch('/posts/{post}','PostsController@update');
	Route::post('/posts','PostsController@store');
	Route::delete('/posts/{post}','PostsController@destroy');
	Route::post('/posts/{post}/likes','LikesController@store');
	Route::post('/posts/{post}/dislike','LikesController@destroy');
	Route::post('/posts/{post}/comments','CommentsController@store');
	Route::get('/posts/{post}/comments/all','CommentsController@index');

});

