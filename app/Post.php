<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	 
    protected $guarded = [];

    public function user(){
    	return $this->belongsTo(User::class, 'user_id');
    }

    public function getImagePathAttribute($image)
    {        

        return (strpos($image, 'picsum') ? $image : asset('storage/'.$image) );
    }

}
