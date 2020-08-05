<template>
    <div class="register-holder">

        <div class="row">

            <div class="offset-md-3 col-md-6 bg-white border mt-2 pr-5 pl-5 pt-2 pb-0">
                
                <h1 class="text-center">Laragram</h1>

                <h3 class="text-center">Sign up to see photos and videos from your friends.
                </h3>      
                    
                <form method="POST" @submit.prevent="register">                    

                    <div class="form-group row">                    

                        <div class="col-md-12">

                            <div class="special-label-holder">     
                                <input  
                                    placeholder=" "
                                    autocomplete="name" 
                                    id="name" 
                                    type="text" 
                                    class="form-control" 
                                    name="name" 
                                    required 
                                    v-model="form.name" 
                                    @keydown="errors.name = false" 
                                />

                                 <label for="name">Name</label>                                   

                            </div>

                            <span v-if="errors.name" v-text="errors.name[0]" class="invalid-feedback"></span>

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
                                    class="form-control" 
                                    name="email" 
                                    required 
                                    v-model="form.email" 
                                    @keydown="errors.email = false">

                                <label for="email" >Email</label>
                            </div>  
                            <span v-if="errors.email" v-text="errors.email[0]" class="invalid-feedback"></span>  
                        </div>
                    </div>               

                    <div class="form-group row">                    

                        <div class="col-md-12">
                            <div class="special-label-holder"> 

                                <input
                                    placeholder=" "                                        
                                    id="password" 
                                    type="password" 
                                    class="form-control" 
                                    name="password" 
                                    autocomplete="new-password" 
                                    required 
                                    v-model="form.password" 
                                    @keydown="errors.password = false"
                                />

                                 <label for="password" >Password</label>                                
                            </div> 

                            <span v-if="errors.password" v-text="errors.password[0]" class="invalid-feedback"></span>

                        </div>
                    </div>

                    <div class="form-group row">                        
                        <div class="col-md-12">
                            <div class="special-label-holder">                                

                                <input                                     
                                    placeholder=" "
                                    id="password-confirm" 
                                    type="password" 
                                    class="form-control" 
                                    name="password_confirmation"
                                    autocomplete="new-password" 
                                    required 
                                    v-model="form.password_confirmation" 
                                    @keydown="errors.password = false"
                                />

                                <label for="password-confirm" >Confirm password</label>
                            </div>        
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-md-12 text-center">
                            <button type="submit" class="btn btn-primary" :disabled="loading">
                                Register
                            </button>

                            <div class="mt-6" v-if="feedback">
                                <div class="text-danger" v-text="feedback"></div>
                            </div>


                        </div>
                    </div>



                     <div class="form-group row">
                            <div class="col-md-12 text-center">
                                <p>
                                    By signing up, you agree to our Terms , Data Policy and Cookies Policy.

                                </p>
                            </div>
                        </div>
                </form>
                   
                
            </div>
        </div>

        <div class="row mt-4">
            <div class="offset-md-3 col-md-6 bg-white border text-center">
                <p class="m-3">
                    Tienes una cuenta? <router-link :to="{ name:'login' }">entrar</router-link>
                </p>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name:'Register',

    data() {
        return {
            form: {
                name: "",                
                email: "",
                password: "",
                password_confirmation: ""
            },
            feedback: "",
            loading: false,
            errors: {}
        };
    },

    methods: {
        register() {
            this.loading = true;

            axios
                .post("/register", this.form)
                .then(({data: {redirect}}) => {
                    location.assign(redirect);
                })
                .catch(error => {                	
                    this.errors = error.response.data.errors;
                    this.loading = false;
                    this.feedback = error.response.data.message;
                });
        }
    }
};
</script>
