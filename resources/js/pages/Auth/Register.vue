<template>
    <div class="register container pb-2">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="register-holder">
                    <div class="row">
                        <div class="offset-md-3 col-md-6 bg-white border mt-2 pr-5 pl-5 pt-2 pb-0">                            
                            <h1 class="text-center">Laragram</h1>
                            <h3 class="text-center">Sign up to see photos and videos from your friends.
                            </h3>                                      
                            <form method="POST" @submit.prevent="register">
                                <div class="form-group row" :class="{ 'form-group--error': $v.form.name.$error }">
                                    <div class="col-md-12">
                                        <div class="special-label-holder">     
                                            <input  
                                                placeholder=" "
                                                autocomplete="name" 
                                                id="name" 
                                                type="text" 
                                                class="name form-control" 
                                                name="name"
                                                v-model="form.name" 
                                                @keydown="errors.name = false" 
                                            />
                                             <label for="name">Name</label>
                                         </div>                                        
                                         <div 
                                            class="error text-danger" 
                                            v-if="!$v.form.name.required">Name is required
                                         </div> 
                                    </div>
                                </div>                    
                                <div class="form-group row" :class="{ 'form-group--error': $v.form.email.$error }">
                                    <div class="col-md-12">
                                        <div class="special-label-holder">
                                            <input  
                                                placeholder=" "
                                                autocomplete="off"
                                                id="email" 
                                                type="email" 
                                                class="email form-control" 
                                                name="email"
                                                v-model="form.email" 
                                                @keydown="errors.email = false"
                                            />
                                            <label for="email" >Email</label>
                                        </div> 
                                         <div 
                                            class="error text-danger" 
                                            v-if="!$v.form.email.required">Email is required
                                        </div>                                         
                                    </div>
                                </div>               
                                <div class="form-group row" :class="{ 'form-group--error': $v.form.password.$error }">
                                    <div class="col-md-12">
                                        <div class="special-label-holder"> 
                                            <input
                                                placeholder=" "                                        
                                                id="password" 
                                                type="password" 
                                                class="password form-control" 
                                                name="password" 
                                                autocomplete="new-password" 
                                                v-model="form.password" 
                                                @keydown="errors.password = false"
                                            />
                                            <label for="password" >Password</label>
                                        </div> 
                                        <div 
                                            class="error text-danger" 
                                            v-if="!$v.form.password.required">Password is required
                                        </div> 
                                    </div>
                                </div>
                                <div class="form-group row" :class="{ 'form-group--error': $v.form.password_confirmation.$error }">
                                    <div class="col-md-12">
                                        <div class="special-label-holder">
                                            <input                                     
                                                placeholder=" "
                                                id="password-confirm" 
                                                type="password" 
                                                class="password_confirmation form-control" 
                                                name="password_confirmation"
                                                autocomplete="new-password"
                                                v-model="form.password_confirmation" 
                                                @keydown="errors.password = false"
                                            />
                                            <label for="password-confirm" >Confirm password</label>
                                        </div>
                                        <div 
                                            class="error text-danger" 
                                            v-if="!$v.form.password_confirmation.required">Password confirmation is required
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
            </div>
        </div>
    </div>
</template>

<script>
import {REGISTER} from '../../store/actions.type.js'
import { required, email } from 'vuelidate/lib/validators'
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
            loading: false            
        };
    },
    validations: {
        form:{
            name: {
                required                         
            },
            email: {
                required,
                email                        
            },
            password: {
                required
            },
            password_confirmation: {
                required                
            }
        }
    },

    methods: {
        async register(){

            this.$v.$touch()

            if (this.$v.$invalid) {
                return false;
            }
            
            this.loading = true;

            try{
                await this.$store.dispatch(REGISTER, this.form)    
                this.$router.push('/login');  
            }catch(error){
                this.loading = false;
                this.feedback = error.response.data.message;
            }            

        }
    }
};
</script>
