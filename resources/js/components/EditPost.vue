<template>	
    <modal class="edit-modal" name="edit-modal" :adaptive="true" width="100%" height="100%" @before-open="beforeOpen">
        <div class="container">           

            <div class="row justify-content-center">
                <div class="col-lg-6">  

                    <div class="header d-flex justify-content-between align-items-center">
                        <div>
                            <a href="#" @click.prevent="$modal.hide('edit-modal');">X</a>
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

                        <textarea v-model="post.description" class="form-control" placeholder="Escribe una descripcion">
                            
                        </textarea>
                        
                    </div>

                </div>
            </div>
        </div>

    </modal>
	
</template>
<script>
	
	import EventBus from '../event-bus.js';

	export default{		

		data(){
			return {
				post: {}
			}
		},

		methods:{

			beforeOpen(event){					
				this.post = event.params.post;				
			},           				

			edit(){	                          

				axios.patch('/posts/'+this.post.id, {'description':this.post.description}).then(()=>{										
					EventBus.$emit('refresh');											
				});				

                this.$modal.hide('edit-modal',{description: this.post.description});
				
			}

		}


	}
	
</script>