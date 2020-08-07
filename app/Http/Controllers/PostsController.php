<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use App\Post;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller
{

    /**
     * Create a new PostsController instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *     
     * @return mixed
     */    
    public function index(){
    	
    	if (request()->expectsJson()){

             return Post::with('user')->latest()->get();
             
        }

    }

    /**
    * Store a newly created resource in storage.
    *     
    * @return mixed
    */
    public function store(){        

    	request()->validate([
            'image_path' => ['required', 'image']
        ]); 

        $post = Post::create([
            'user_id' => auth()->id(),
            'image_path' => request()->file('image_path')->store('posts', 'public'),  
            'description' => request('description'),
            'filter' => request('filter')
        ])->load('user');    

        return $post;
    }

    /**
    * Update the given post.
    *     
    * @param Post $post
    */
    public function update(Post $post){

        $this->authorize('update', $post);

        $post->update(['description' => request('description')]);        

        return $post;

    }

    /**
    * Delete the given post.
    *     
    * @param Post $post
    */
    public function destroy(Post $post){

        $this->authorize('update', $post);                

        if ( Storage::disk('public')->exists($post->getOriginal('image_path')) ){

            Storage::disk('public')->delete($post->getOriginal('image_path'));

        }

        $post->delete();
        
        return response([], 204);        
        
    }

    /**
    * Retrieve the given post.
    *     
    * @param Post $post
    */
    public function show(Post $post){        

        if (request()->expectsJson()) {  
                     
             return $post->load('user');
             
        }

    }
    
}
