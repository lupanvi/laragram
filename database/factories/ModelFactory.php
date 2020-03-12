<?php

use Faker\Generator as Faker;
use Illuminate\Http\UploadedFile;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'avatar_path'=>'images/avatar_default.png',
        'email_verified_at' => now(),
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Post::class, function (Faker $faker) {
    
    $faker->addProvider(new \Mmo\Faker\PicsumProvider($faker)); 

    $filters = array('normal', 'clarendon','gingham', 'moon', 'lark', 'reyes', 'juno', 'slumber', 'aden', 'perpetua','mayfair', 'rise', 'hudson','valencia','xpro2','willow', 'lofi', 'inkwell', 'nashville' );
    $filter_key = array_rand($filters);
    

    return [
    	'user_id'=>function(){
    		return factory(App\User::class)->create()->id;
    	}, 
        'image_path' => $faker->picsumUrl(),    
        'filter' => $filters[$filter_key],
        'description' => $faker->paragraph        
    ];
});