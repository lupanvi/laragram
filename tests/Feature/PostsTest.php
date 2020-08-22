<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Post;
use App\Comment;
use App\User;

class PostsTest extends TestCase
{
	use RefreshDatabase; 
   
    /** @test */

    function guest_cannot_manage_projects()
    {     

        $post = factory(Post::class)->create();

        $this->get('/posts')->assertStatus(401);   

        $this->patch($post->path(), ['description'=>'edited'] )->assertStatus(401);                                     
        $this->post('/posts', $post->toArray())->assertStatus(401);

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

        $this->delete($post->path())->assertStatus(401);;

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

    /** @test */
    function a_user_can_delete_their_own_post_with_its_comments(){

        $this->signIn();
        $post = factory(Post::class)->create(['user_id'=>auth()->id()]);        
        $comment1 = factory(Comment::class)->create([ 'post_id'=>$post->id ]);
        $comment2 = factory(Comment::class)->create([ 'post_id'=>$post->id ]);

        $response = $this->deleteJson($post->path());

        $response->assertStatus(204);                

        $this->assertDatabaseMissing('comments', ['id' => $comment1->id]);        
        $this->assertDatabaseMissing('comments', ['id' => $comment2->id]);        
        
    }

    /** @test*/
    function a_user_can_see_a_given_post(){

        $user = $this->signIn();
        $post = factory(Post::class)->create();         

        $response = $this->json('GET','/posts/'.$post->id )->json();   

        $this->assertEquals($post->id, $response['id']);
        $this->assertEquals($post->description, $response['description']);

    }


}