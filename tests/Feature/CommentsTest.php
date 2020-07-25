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

        $response = $this->post($post->path() . '/comments', $comment)->json();

        $this->assertDatabaseHas('comments', ['body' => $comment['body']] );        
        $this->assertEquals(1, $post->fresh()->comments_count);
        $this->assertEquals($response['body'], $comment['body']);   
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
    function a_post_can_have_comments_from_their_owners(){

        $this->signIn();
        
        $post = factory(Post::class)->create(['user_id'=>auth()->id()]);

        $comment1 = factory(Comment::class)->create([
            'post_id'=>$post->id,
            'body'=> 'body text'
        ]);

        $comment2 = factory(Comment::class)->create([
            'post_id'=>$post->id,
            'body'=> 'body text 2'
        ]);                        

        $response = $this->getJson($post->path() .'/comments/all')->json();            

        $this->assertEquals(auth()->id(), $response['post']['user']['id']);
        $this->assertEquals(2, count($response['comments']));   
        $this->assertEquals('body text', $response['comments'][0]['body']);        
        $this->assertEquals('body text 2', $response['comments'][1]['body']);        
        $this->assertEquals($comment1->owner->id, $response['comments'][0]['owner']['id']);
        $this->assertEquals($comment2->owner->id, $response['comments'][1]['owner']['id']);
        
    }

   
}
