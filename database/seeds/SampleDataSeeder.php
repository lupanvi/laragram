<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Post;

class SampleDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         factory(User::class)->create(
                [
                    'name' => 'Luis',                    
                    'email' => 'test@hotmail.com',
                    'password' => bcrypt('123456')
                ]
            );

         factory(Post::class,10)->create();

    }
}
