<template>	
    <div class="edit-post">
        <div class="container">           

            <div class="row justify-content-center">
                <div class="col-lg-6">  

                    <div class="header d-flex justify-content-between align-items-center">
                        <div>
                            <a href="#" @click.prevent="close">X</a>
                        </div>
                        <div>
                            <h1>Edit information</h1>
                        </div>
                        <div>                            
                            <a href="#" @click.prevent="edit">Save</a>                            
                        </div>

                    </div> 

                    <div class="main-image"
                         :class="post.filter"
                         :style="{ backgroundImage: 'url(' + post.image_path + ')' }">
                         	
                    </div>                                               

                    <div class="description-container">

                        <textarea v-model="post.description" class="form-control" placeholder="Write a description">
                            
                        </textarea>
                        
                    </div>

                    <div 
                        v-if="feedback" 
                        class="alert alert-danger p-1 m-1" 
                        v-text="feedback">                        
                    </div>

                </div>
            </div>
        </div>

    </div>
	
</template>
<script>	

    import {mapGetters} from 'vuex';
    import store from "../store";

	export default{	

        name: 'PostsEdit',

        beforeRouteEnter(to, from, next) { 

            store.dispatch('fetchPost', to.params.id);                        
            return next();
        },

        beforeRouteLeave(to, from, next) {
            store.dispatch('resetStatePost');
            return next();
        },

        computed:{

            ...mapGetters(['post'])                

        },     


		data(){
			return {                
                feedback:''                
			}
		},

		methods:{            

			edit(){               

                this.$store
                    .dispatch('editPost')
                    .then(()=>{                        
                        this.$router.push('/');
                    }).catch(({data})=>{
                        this.feedback = data;
                    });                                
				
			},
            close(){
                this.$router.push('/');
            }

		}


	}
	
</script>