<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Post;

class PostsTest extends TestCase
{
	use RefreshDatabase;

 

    /** @test */
    function a_post_requires_a_valid_image(){

        $this->signIn();

        $this->json('POST', '/posts' , [
            'image_path' => 'not-an-image'
        ])->assertStatus(422);

    }

    /** @test */
    function a_user_can_create_a_post()
    {
        $user = $this->signIn();                
        $attributes = factory(Post::class)->raw();        

        $attributes['image_path'] = UploadedFile::fake()->image('post.jpg');               

        $response = $this->json('POST','/posts', $attributes )->json();        

        $this->assertDatabaseHas('posts', [
            'filter'=>$attributes['filter'],
            'description'=>$attributes['description'],
            'user_id' => $user->id
        ]);

        $this->assertEquals(asset('storage/posts/'.$attributes['image_path']->hashName()), $response['image_path']);

        Storage::disk('public')->assertExists('posts/' . $attributes['image_path']->hashName());

    }

    /** @test */
    function a_user_can_edit_a_post(){

        $user = $this->signIn();
        $post = factory(Post::class)->create(['user_id'=>$user->id]);

        $this->patchJson($post->path(), $attributes = ['description'=>'edited'] );        

        $this->assertDatabaseHas('posts', $attributes);

    }
}
