<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Comment;
use App\Post;
use App\User;

class CommentTest extends TestCase
{
    use RefreshDatabase;
    
    /** @test */
    function it_belongs_to_a_post()
    {
        $comment = factory(Comment::class)->create();
        $this->assertInstanceOf(Post::class, $comment->post);
    }
    /** @test */
    function it_has_a_path()
    {
        $comment = factory(Comment::class)->create();
        $this->assertEquals("/api/posts/{$comment->post->id}/comments/{$comment->id}", $comment->path());
    }
    
    /** @test */
    function it_belongs_to_a_owner()
    {        
        $comment = factory(Comment::class)->create();        
        $this->assertInstanceOf(User::class, $comment->owner);
    }

}
