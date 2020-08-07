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
                            <a class="btn" :class="inProgress ? 'disabled' : ''" href="#" @click.prevent="edit">Save</a>                            
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
    import {         
        FETCH_POST,
        POST_RESET_STATE        
    } from "../store/actions.type";


	export default{	

        name: 'PostsEdit',

        beforeRouteEnter(to, from, next) { 

            store.dispatch(FETCH_POST, to.params.id);                        
            return next();
        },

        beforeRouteLeave(to, from, next) {
            store.dispatch(POST_RESET_STATE);
            return next();
        },

        computed:{

            ...mapGetters(['post'])                

        },     


		data(){
			return {                
                feedback:'',
                inProgress: false
			}
		},

		methods:{            

			edit(){ 

                this.inProgress = true;              

                this.$store
                    .dispatch('editPost')
                    .then(()=>{

                        this.$router.push('/');
                        this.inProgress = false;                        

                    }).catch(({data})=>{
                        this.inProgress = false;
                        this.feedback = data;
                    });                                
				
			},
            close(){
                this.$router.push('/');
            }

		}


	}
	
</script>