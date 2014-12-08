<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get( '/auth/facebook', 'AuthController@facebook' );

Route::resource( '/api/login', 'LoginController@store');

Route::resource( '/api/supplier', 'CommonController@suppliers');

Route::resource( '/api/donator', 'CommonController@donators');

Route::any( '{all}', function( $uri ) {
	return View::make('home');
})->where( 'all', '.*' );