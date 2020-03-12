<template>	
    <modal class="more-options-modal" height="auto" name="more-options-modal" @before-open="beforeOpen">        
        <div class="rounded d-flex flex-column align-items-stretch">
            
                
                <button v-if="post.can_update" class="text-center" @click.prevent="edit">Edit</button>                       
                <button v-if="post.can_update" class="text-center text-danger" @click.prevent="destroy">Delete</button>

                 <button class="text-center" @click.prevent="$modal.hide('more-options-modal');">Cancel</button>
            
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

                    
			     this.$modal.show('edit-modal', {post: this.post}); 			
                 this.$modal.hide('more-options-modal');             
				
			},

            destroy(){                           

                axios.delete('/posts/'+this.post.id)
                     .then(()=>{                                     
                        //EventBus.$emit('removePost',{id: this.post.id});
                        EventBus.$emit('refresh');                                         

                }); 
                
                this.$modal.hide('more-options-modal'); 

                
            }

		}


	}
	
</script>