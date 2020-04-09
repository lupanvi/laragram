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
                         :class="postEdit.filter"
                         :style="{ backgroundImage: 'url(' + postEdit.image_path + ')' }">
                         	
                    </div>                                               

                    <div class="description-container">

                        <textarea v-model="postEdit.description" class="form-control" placeholder="Write a description">
                            
                        </textarea>
                        
                    </div>

                </div>
            </div>
        </div>

    </div>
	
</template>
<script>
	
	import {mapActions} from 'vuex';

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
                postEdit: this.post                
			}
		},

		methods:{

            ...mapActions(['editPost']),			

			edit(){

                this.editPost({
                    id: this.postEdit.id, 
                    description: this.postEdit.description
                });	

                this.postEdit = {} 
				
			}

		}


	}
	
</script>