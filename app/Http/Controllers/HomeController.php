<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Post;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => 'index']);
    }

    /**
     * Show the application dashboard.
     *
     * @return mixed
     */
    public function index()
    {        
              
        //if (!Auth::check()){            
        //    return redirect('login');
        //}
        
        return view('layouts.home');        
    }
    

}
