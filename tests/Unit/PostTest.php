<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostTest extends TestCase
{
    use RefreshDatabase;
	
    /** @test */
    function it_has_a_path()
    {
        
        $post = factory('App\Post')->create();

        $this->assertEquals('/posts/'.$post->id, $post->path());

    }    

}
