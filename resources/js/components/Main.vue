<template>
<div>	
	<nav v-if="isAuthenticated" class="navbar navbar-expand-md navbar-light navbar-laravel">
	    <div class="container">
	        <a class="navbar-brand" href="/">
	            Laragram
	        </a>
	        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	            <span class="navbar-toggler-icon"></span>
	        </button>

	        <div class="collapse navbar-collapse" id="navbarSupportedContent">                  

	            <!-- Right Side Of Navbar -->
	            <ul class="navbar-nav ml-auto">
	                <!-- Authentication Links -->
	                    <li class="nav-item dropdown">
	                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-text="currentUser.name">
	                            <span class="caret"></span>
	                        </a>	                        
	                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
	                            <a class="dropdown-item" href="#"
	                               @click.prevent="logout">
	                                Logout
	                            </a>
	                        
	                        </div>
	                    </li>
	              
	            </ul>
	        </div>
	    </div>
	</nav>
	<div v-else>
		no hay login
	</div>

	 <div class="container pb-2">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <router-view></router-view>
			 </div>
	    </div>
	</div>

	
	<div v-if="isAuthenticated">
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

</div>

</template>
<script>
import {mapGetters} from 'vuex';
import { LOGOUT } from "../store/actions.type";
export default{
	name:"Dashboard",
	computed: {
    	...mapGetters(["isAuthenticated", "currentUser"])    
  	},
  	methods:{
  		logout(){
  			this.$store.dispatch(LOGOUT).then(()=>{
  				this.$router.push('/login'); 
  			});  			
  		}
  	}

}
</script>