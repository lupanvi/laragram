<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Post;

class LikesTest extends TestCase
{
	use RefreshDatabase;

    /** @test */
    function guests_may_not_likes_posts()
    {     

        $this->post('/posts/1/likes')->assertStatus(401);
    }
	
    /** @test */
    function a_user_can_like_a_post()
    {

    	$this->signIn();

        $post = factory(Post::class)->create();   

        $this->post($post->path() . '/likes');                

        $this->assertCount(1, $post->likes);
    }

    /** @test */
    function a_user_can_dislike_a_post()
    {

    	$this->signIn();
        $post = factory(Post::class)->create();   
        $post->like();

        $this->post($post->path() . '/dislike');  

        $this->assertCount(0, $post->likes);
    }
}
