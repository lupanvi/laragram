<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Post;
use App\Comment;

class ApiAuthTestTest extends TestCase
{
	use RefreshDatabase;
    
    /** @test */
    function a_guest_can_register()
    {                	
        
        /*$attributes = ['name'=>'Demo', 
        				'email'=>'demo@gmail.com', 
        				'password'=>'123546',
        				'password_confirmation' => '123456'
        			  ];

        $response = $this->post('/api/auth/register', $attributes)->json();        
        $this->assertEquals($attributes['name'], $response['user']['name']);*/                             
    }
      
}
