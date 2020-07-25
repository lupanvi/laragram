<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Post;
use App\User;

class PostTest extends TestCase
{
    use RefreshDatabase;
	
    /** @test */
    function post_has_a_path()
    {
        $post = factory(Post::class)->create();

        $this->assertEquals('/posts/'.$post->id, $post->path());

    }

    /** @test */
    function post_belongs_to_an_owner()
    {        
        $user = $this->signIn();

        $post = factory(Post::class)->create(['user_id'=>$user->id]);

        $this->assertEquals($user->id, $post->user_id);
    }
}
