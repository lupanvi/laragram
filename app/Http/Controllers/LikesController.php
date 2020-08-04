<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class LikesController extends Controller
{
	/**
     * Create a new PostsController instance.
     */
	public function __construct()
    {
        $this->middleware('auth');
    }

    /**
    * Store a new like in the database.
    *        
    * @param Post $post     
    */
    public function store(Post $post){
        $post->like();
        return $post;
    }

     /**
    * Delete the like.
    *        
    * @param Post $post     
    */
    public function destroy(Post $post){
        $post->dislike();
        return $post;
    }
}
