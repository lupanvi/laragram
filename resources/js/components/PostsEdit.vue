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
                         :class="editPost.filter"
                         :style="{ backgroundImage: 'url(' + editPost.image_path + ')' }">
                         	
                    </div>                                               

                    <div class="description-container">

                        <textarea v-model="editPost.description" class="form-control" placeholder="Escribe una descripcion">
                            
                        </textarea>
                        
                    </div>

                </div>
            </div>
        </div>

    </div>
	
</template>
<script>
	
	import EventBus from '../event-bus.js';

	export default{	

        name: 'PostsEdit',

        props:{
            post:{
                type: Object,
                required: true
            }
        },        

		data(){
			return {
                editPost: this.post                
			}
		},

		methods:{			

			edit(){	                          

				axios
                    .patch('/posts/'+this.editPost.id, {'description':this.editPost.description})
                    .then(()=>{	                    												   
                       this.close();
				    });				                
				
			},

            close(){
                this.editPost = {}                                
                this.$router.go('/');
            }

		}


	}
	
</script>