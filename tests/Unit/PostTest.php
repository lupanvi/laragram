<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Post;

class PostTest extends TestCase
{
    use RefreshDatabase;
	
    /** @test */
    function it_has_a_path()
    {
        
        $post = factory(Post::class)->create();

        $this->assertEquals('/api/posts/'.$post->id, $post->path());

    }       

}
