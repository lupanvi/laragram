<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script>
        window.App = {!! json_encode([             
            'signedIn' => Auth::check()
        ]) !!};
    </script>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    

    <!-- Fonts -->
    

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cssgram-cssgram.netdna-ssl.com/cssgram.min.css">


    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">



</head>
<body>
    <div id="app">                    
        
            <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
                <div class="container">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle 

navigation') }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">                   

                        <!-- Right Side Of Navbar -->
                        <ul class="navbar-nav ml-auto">
                            <!-- Authentication Links -->                                                        
                           
                                <li class="nav-item dropdown">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ Auth::user()->name }} <span class="caret"></span>
                                    </a>

                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="{{ route('logout') }}"
                                           onclick="event.preventDefault();
                                                         document.getElementById('logout-form').submit();">
                                            {{ __('Logout') }}
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            @csrf
                                        </form>
                                    </div>
                                </li>
                          
                        </ul>
                    </div>
                </div>
            </nav>

            <main>             
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">    
                            <router-view></router-view>
                        </div>
                    </div>
                </div>            
            </main>

            <footer class="fixed-bottom">

                <div class="container">

                   <div class="row justify-content-center">

                        <div class="col-lg-8 d-flex justify-content-between">

                            <div class="home">

                                <a href="/home"><i class="fas fa-home"></i></a>

                            </div>

                           <upload-button></upload-button>                                                

                        </div>
                       
                   </div>     

                </div>
                
            </footer>                        
        
        <more-options-modal></more-options-modal>
</div>        
</body>
</html>