<?php

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


Auth::routes();

Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@home');
Route::get('/posts','PostsController@index');
Route::post('/posts','PostsController@store');
Route::post('/posts/{post}/likes','PostsController@like');
Route::post('/posts/{post}/dislike','PostsController@dislike');

