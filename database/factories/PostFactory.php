<?php

use Faker\Generator as Faker;
use Illuminate\Http\UploadedFile;

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