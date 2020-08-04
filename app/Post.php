<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;
use App\Comment;

class Post extends Model
{    
	 
    protected $guarded = [];    
    
    protected $appends = ['liked', 'likesCount', 'can_update','path', 'commentsCount']; 

    public function getCanUpdateAttribute()
    {
        return Gate::allows('update', $this);        
    }

    public function user(){
    	return $this->belongsTo(User::class, 'user_id');
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function getCommentsCountAttribute(){
        return $this->comments()->count();
    }

    /**
     * Determine the image path to the post.
     *
     * @return string
     */

    public function getImagePathAttribute($image)
    {        

        return (strpos($image, 'picsum') ? $image : asset('storage/'.$image) );
    }

    /**
     * Determine the path to the post.
     *
     * @return string
     */

    public function path(){
    	return "/posts/{$this->id}";
    }

    /**
     * Fetch the path to the post as a property.
     */
    public function getPathAttribute(){
        return $this->path();
    }

    /**
     * A post can be liked.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function likes()
    {        
        return $this->belongsToMany(User::class);
    }

    /**
     * Like the current post.
     *
     * @return Model
     */
    public function like()
    {
        $attributes = ['user_id' => auth()->id()];        

        if (! $this->likes()->where($attributes)->exists()) {            
            return $this->likes()->attach(auth()->id());
        }
    }

    /**
     * Check if current logged in user likes this post
     *
     * @return Model
     */

    public function liked(){

        $attributes = ['user_id' => auth()->id()];        

        if ($this->likes()->where($attributes)->exists()) {
            return true;
        }

        return false;

    }

    public function getLikedAttribute(){
        return $this->liked();
    }

    /**
     * Get the number of likes for the post.
     *
     * @return int
     */
    public function getLikesCountAttribute()
    {
        return $this->likes->count();
    }

    /**
     * Dislike a post.
     *
     * @return int
     */
    public function dislike()
    {
        $attributes = ['user_id' => auth()->id()]; 

        if ($this->likes()->where($attributes)->exists()) {            
            return $this->likes()->detach(auth()->id());
        }
    }        

}
