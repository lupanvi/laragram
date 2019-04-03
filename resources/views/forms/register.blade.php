<register inline-template>

    <div class="register-holder">

        <div class="row">

            <div class="{{ $clases }} bg-white border mt-2 pr-5 pl-5 pt-2 pb-0">
                
                <h1>Laragram</h1>

                <h3>Registrate para ver fotos y videos de tus amigos</h3>      
                    
                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="form-group row">                    

                        <div class="col-md-12">

                            <div class="special-label-holder">     

                                <input  
                                    placeholder=" "
                                    autocomplete="off" 
                                    id="name" 
                                    type="text" 
                                    class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" 
                                    name="name" 
                                    value="{{ old('name') }}" required>

                                 <label for="name">Nombre</label>     

                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif

                            </div>

                        </div>
                    </div>

                    <div class="form-group row">                    
                        <div class="col-md-12">

                            <div class="special-label-holder">
                                                                                
                                <input  
                                    placeholder=" "
                                    autocomplete="off"
                                    id="email" 
                                    type="email" 
                                    class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" 
                                    name="email" 
                                    value="{{ old('email') }}" required>

                                <label for="email" >Email</label>    

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>    
                        </div>
                    </div>

                    <div class="form-group row">                    

                        <div class="col-md-12">
                            <div class="special-label-holder">                                
                                <input
                                    placeholder=" "    
                                    autocomplete="off"
                                    id="password" 
                                    type="password" 
                                    class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" 
                                    name="password" required >

                                 <label for="password" >Contraseña</label>   

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>    
                        </div>
                    </div>

                    <div class="form-group row">                        
                        <div class="col-md-12">
                            <div class="special-label-holder">                                

                                <input 
                                    autocomplete="off"
                                    placeholder=" "
                                    id="password-confirm" 
                                    type="password" 
                                    class="form-control" 
                                    name="password_confirmation" required>

                                <label for="password-confirm" >Confirme contraseña</label>
                            </div>        
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary">
                                Registrarse
                            </button>
                        </div>
                    </div>

                     <div class="form-group row">
                            <div class="col-md-12">
                                <p>
                                    Al registrarte, aceptas nuestras Condiciones, la Política de datos y la Política de cookies.
                                </p>
                            </div>
                        </div>
                </form>
                   
                
            </div>
        </div>

        <div class="row mt-4">
            <div class="{{ $clases }} bg-white border text-center">
                <p class="m-3">
                    Tienes una cuenta? <a href="{{ route('login') }}">entrar</a>
                </p>
            </div>
        </div>

    </div>
</register>