<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class LikesController extends Controller
{
    public function store(Post $post){
        $post->like();
    }

    public function destroy(Post $post){
        $post->dislike();
    }
}
