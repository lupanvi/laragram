<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostsController extends Controller
{
    
    public function index(){
    	
    	if (request()->expectsJson()) {            
             return Post::with('user')->latest()->get();
        }

    }

    public function store(){

    	request()->validate([
            'image_path' => ['required', 'image']            
        ]);        
        //se usa load() en vez de with() porque ya se ejecuto get() o all() con el create()
        //with se usa antes del get(), all()
        //los dos cumplen la misma funcion solo que load() ejecuta despues
        $post = Post::create([
            'user_id' => auth()->id(),
            'image_path' => request()->file('image_path')->store('posts', 'public'),  
            'description' => request('description'),
            'filter' => request('filter'),
            'likes' => 0

        ])->load('user');    

        return $post;
    }

    public function like(Post $post){
        $post->like();
    }

    public function dislike(Post $post){
        $post->dislike();
    }
}
