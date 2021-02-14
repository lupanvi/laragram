<template>  
    <div class="container pb-2 login">
        <div class="row justify-content-center">
            <div class="col-lg-12">    
                <div class="login">
                    <div class="row">
                        <div class="offset-md-3 col-md-6 border p-5 bg-white">
                            <h1 class="text-center">Laragram</h1>
                            <form @submit.prevent="onSubmit">               
                                <div class="form-group row" :class="{ 'form-group--error': $v.form.email.$error }">    
                                    <div class="col-md-12">
                                        <div class="special-label-holder">
                                            <input 
                                                placeholder=" " 
                                                id="email" 
                                                type="email" 
                                                class="email form-control" 
                                                name="email" 
                                                autocomplete="email"
                                                v-model="form.email"
                                            />
                                            <label for="email">Email</label>
                                        </div>
                                        <div 
                                            class="error text-danger" 
                                            v-if="!$v.form.email.required">Email is required
                                        </div> 
                                    </div>
                                </div>                                               
                                <div class="form-group row" :class="{ 'form-group--error': $v.form.email.$error }">                    
                                    <div class="col-md-12">
                                          <div class="special-label-holder">
                                            <input 
                                                placeholder=" " 
                                                id="password" 
                                                type="password" 
                                                class="password form-control" 
                                                name="password" 
                                                autocomplete="current-password"
                                                v-model="form.password"
                                                
                                            >

                                            <label for="email">Password</label>    
                                          </div>
                                          <div 
                                              class="error text-danger" 
                                              v-if="!$v.form.password.required">Password is required
                                          </div>                                              
                                    </div>
                                </div>                                 

                                <div class="form-group row">
                                    <div class="col-md-12 text-center">
                                        <div class="form-check">
                                            <input class="remember form-check-input" type="checkbox" name="remember" id="remember" v-model="form.remember">
                                            <label class="form-check-label" for="remember">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>                          
                                <div class="form-group row mt-0">
                                    <div class="col-md-12 text-center">
                                        <button 
                                            type="submit" 
                                            class="btn btn-primary" 
                                            :disabled="loading">
                                            Log In
                                        </button>                  
                                    </div>
                                </div>                                
                                <div class="mt-6" v-if="feedback">
                                    <div class="text-danger" v-text="feedback"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                     <div class="row mt-4">
                        <div class="offset-md-3 col-md-6 bg-white border text-center">
                            <p class="m-3">
                                Don't have an account? <router-link :to="{ name: 'register'}">Sign Up</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {mapGetters} from 'vuex'
import {LOGIN} from '../../store/actions.type.js'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data() {
        return {
            form: { email: "", password: "", remember: false },            
            loading: false,
            feedback: ""
        };
    },

    validations: {
        form:{
            email: {
                required                         
            },
            password: {
                required
            }
        }
    },    

    methods: {
        async onSubmit() {  

            this.$v.$touch()

            if (this.$v.$invalid) {
                return false
            }

            this.loading = true  
                      
            try{
                await this.$store.dispatch(LOGIN, this.form)                   
                this.$router.push('/')
            }catch(error){
                this.loading = false
                this.feedback = error.response.data.message
            }                                
        }
    }
};
</script>