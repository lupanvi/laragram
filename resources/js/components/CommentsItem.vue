<template>
	<div class="comment p-2">

		<div class="d-flex">
            <div class="mb-2 ml-2 mr-3 mt-1 avatar">     
                <img 
                	   :src="comment.owner.avatar_path"
                	   class="img-fluid rounded-circle" 
                    />                                                
            </div>            
            <div class="post_details">
            	<div>
            		<a href="#" class="font-weight-bold mr-1">
                    {{ comment.owner.name }}
                	</a>
                	<span>
                		{{ comment.body }}
                	</span>
            	</div>
            	<div>
            		{{ ago }}
            	</div>
        	</div>
        </div> 
		
	</div>
</template>
<script>

import moment from 'moment';

export default{

	name: 'CommentsItem',
    computed:{
        ago(){
           return moment(this.comment.created_at).fromNow();
        }    
    },
	props:{
		comment: {
			type: Object,
			required: true
		}
	}	
	
}	
</script>

<style scoped>

	.comment a{
		display: inline;
		color: #636b6f;
		text-decoration: none;
	}
	
</style>