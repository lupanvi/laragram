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

	
	import {mapActions} from 'vuex';

	export default{        

		data(){
			return {
				post: {}
			}
		},

		methods:{

			...mapActions(['removePost']),

			beforeOpen(event){					
				this.post = event.params.post;				
			},           				

			edit(){	                          

				 this.$modal.hide('more-options-modal'); 
				 this.$router.push({ name: 'posts.edit', params: {id: this.post.id}  });   	
			},

            destroy(){                                           
                     	
				this.removePost(this.post.id);                                                
                this.$modal.hide('more-options-modal');
                
            }

		}


	}
	
</script>