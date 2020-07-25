<?php

use Faker\Generator as Faker;
use Illuminate\Http\UploadedFile;

$factory->define(App\Comment::class, function (Faker $faker) {            

    return [
        'post_id'=>function(){
            return factory(App\Post::class)->create()->id;
        },     
        'user_id'=>function(){
            return factory(App\User::class)->create()->id;
        },     

        'body' => $faker->paragraph        
    ];
});