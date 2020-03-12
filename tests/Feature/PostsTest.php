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

    function guests_may_not_create_posts()
    {     

        $this->post('/posts')->assertStatus(302)->assertRedirect('/login');
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
    function a_post_requires_a_valid_image(){

        $this->signIn();

        $this->json('POST', '/posts' , [
            'image_path' => 'not-an-image'
        ])->assertStatus(422);

    }

    /** @test */
    function a_user_can_edit_a_post(){

        $user = $this->signIn();
        $post = factory(Post::class)->create(['user_id'=>$user->id]);

        $this->patchJson($post->path(), $attributes = ['description'=>'edited'] );        

        $this->assertDatabaseHas('posts', $attributes);

    }

    /** @test */
    function a_user_can_not_edit_others_posts(){

        $user = $this->signIn();
        $post = factory(Post::class)->create();

        $this->patchJson($post->path(), $attributes = ['description'=>'edited'] )
             ->assertStatus(403);        

        $this->assertDatabaseMissing('posts', $attributes);

    }

    /** @test */
    function unauthorized_users_may_not_delete_posts(){        

        $post = factory(Post::class)->create();

        $this->delete($post->path())->assertRedirect('/login');

        $this->signIn();
        $this->delete($post->path())->assertStatus(403);

    }

    /** @test */
    function a_user_can_delete_their_own_post(){

        $this->signIn();
        $post = factory(Post::class)->create(['user_id'=>auth()->id()]);        

        $response = $this->deleteJson($post->path());

        $response->assertStatus(204);

        $this->assertDatabaseMissing('posts', ['id' => $post->id]);        
        $this->assertEquals(0, Post::count());

    }


}
