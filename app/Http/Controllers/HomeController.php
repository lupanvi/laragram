<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Post;

class HomeController extends Controller
{   

    /**
     * Show the application dashboard.
     *
     * @return mixed
     */
    public function index()
    {        
              
        return view('layouts.home');        
    }
    

}
