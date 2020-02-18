
<div class="login">
    <div class="row">
        <div class="offset-md-4 col-md-4 border p-5 bg-white">            

            <h1 class="text-center">Laragram</h1>
                
            <form method="POST" action="{{ route('login') }}">

                @csrf

                <div class="form-group row">                    

                    <div class="col-md-12">
                        <div class="special-label-holder">
                            <input 
                                placeholder=" " 
                                id="email" 
                                type="email" 
                                class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" 
                                name="email" 
                                value="{{ old('email') }}" required>

                                <label for="email">Email</label>

                        </div>    

                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>
                </div>

                <div class="form-group row">                    

                    <div class="col-md-12">
                          <div class="special-label-holder">
                            <input 
                                placeholder=" " 
                                id="password" 
                                type="password" 
                                class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" 
                                name="password" 
                                required>

                            <label for="email">Password</label>    
                          </div>      

                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-md-12 text-center">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                            <label class="form-check-label" for="remember">
                                Remember me
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group row mt-0">
                    <div class="col-md-12 text-center">
                        <button type="submit" class="btn btn-primary">
                            Log In
                        </button>

                  
                    </div>
                </div>
            </form>
                
            
        </div>
    </div>

   <div class="row mt-4">
    <div class="offset-md-4 col-md-4 bg-white border text-center">
        <p class="m-3">
            Don't have an account? <a href="{{ route('register') }}">Sign Up</a>
        </p>
    </div>
    </div>

</div>