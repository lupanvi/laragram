<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Post;
use App\Comment;

class CommentsTest extends TestCase
{
	use RefreshDatabase;
    
    /** @test */
    function unauthenticated_users_may_not_add_comments()
    {            

    	$post = factory(Post::class)->create();
        $this->post($post->path().'/comments', [])
             ->assertRedirect('/login');
    }

    /** @test */
    function an_authenticated_user_may_comment_a_post()
    {
        $this->signIn();

        $post = factory(Post::class)->create();
        $comment = factory(Comment::class)->raw();

        $this->post($post->path() . '/comments', $comment);

        $this->assertDatabaseHas('comments', ['body' => $comment['body']] );
        $this->assertEquals(1, $post->fresh()->comments_count);
    }

    /** @test */
    function a_comment_requires_a_body()
    {
        $this->signIn();

        $post = factory(Post::class)->create();
        $comment = factory(Comment::class, ['body' => null])->raw();

        $this->post($post->path() . '/comments', $comment)
             ->assertSessionHasErrors('body');
    }

    /** @test */
    function a_post_can_have_comments()
    {     

        $this->signIn();        
        $post = factory(Post::class)->create();
        $comment = factory(Comment::class)->raw();        

        $this->post($post->path() . '/comments', $comment);                

        $response = $this->getJson($post->path().'/comments')->json();
        $this->assertEquals($response[0]['body'], $comment['body']);    
        
    }

   
}
