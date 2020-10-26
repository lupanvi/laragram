<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Post;
use App\User;

class Comment extends Model
{
    
    protected $guarded = [];      

    public function post(){
    	return $this->belongsTo(Post::class);
    }

    public function path(){
    	return "/api/posts/{$this->post->id}/comments/{$this->id}";
    }

    public function owner(){
    	return $this->belongsTo(User::class, 'user_id');
    }    

}
