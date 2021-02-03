<template>  
    <div class="container pb-2">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                
                <div class="login">
                    <div class="row">
                        <div class="offset-md-3 col-md-6 border p-5 bg-white">            

                            <h1 class="text-center">Laragram</h1>

                            <form @submit.prevent="onSubmit" @keydown="feedback = ''">               

                                <div class="form-group row">                    
                                    <div class="col-md-12">
                                        <div class="special-label-holder">
                                            <input 
                                                placeholder=" " 
                                                id="email" 
                                                type="email" 
                                                class="form-control" 
                                                name="email" 
                                                autocomplete="email"                                    
                                                v-model="form.email"
                                                required
                                            />

                                            <label for="email">Email</label>

                                        </div>                         
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
                                                autocomplete="current-password" 
                                                required 
                                                v-model="form.password">

                                            <label for="email">Password</label>    
                                          </div>                             
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-12 text-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="remember" id="remember" v-model="form.remember">

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

                                <div 
                                    class="form-group row mt-0 text-danger text-center" 
                                    v-if="errors" 
                                    v-text="errors">                                    
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

import {mapGetters} from 'vuex';
import {LOGIN} from '../store/actions.type.js';

export default {
    name: 'Login',
    data() {
        return {
            form: { email: "", password: "", remember: false },            
            loading: false
        };
    },

    computed:{
        ...mapGetters(['errors'])                
    },

    methods: {
        async onSubmit() {

            this.loading = true;
            
            await this.$store.dispatch(LOGIN, this.form);                   
            this.$router.push('/');                                                       

            this.loading = false;
        
        }
    }
};
</script>
