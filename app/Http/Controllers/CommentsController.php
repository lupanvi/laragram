<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Post;

class CommentsController extends Controller
{
    /**
     * Create a new PostsController instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Post $post){
        
        $comments = Comment::where('post_id',$post->id)
                            ->take(10)
                            ->with('owner')
                            ->get();

        if (request()->wantsJson()){

            return $comments;    

        }        

    }

    public function store(Post $post){

    	request()->validate([
            'body' => ['required']            
        ]);        

        return $post->comments()->create([            
            'body' => request('body'),
            'user_id' => auth()->id()            
        ])->load('owner');        

    }

}
