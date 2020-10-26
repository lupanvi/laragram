<template>
	<div class="comments">
		<div class="container">           
            <div class="row justify-content-center">
                <div class="col-lg-8 mt-3">                	

                	<div class="d-flex flex-column vh-100">

						<div class="header d-flex align-items-center">
							<a class="mr-4 return" href="#" @click.prevent="$router.push('/')">
								<i class="fas fa-arrow-left"></i>
							</a>
							<h1>Comments</h1>						
						</div>

						<comments-add-new :path="post.path" :id="post.id"></comments-add-new>		

						 <div class="post flex-grow-1 pt-2 mb-3">
							<div class="box w-100">

								 <div class="user d-flex mb-2 p-2 border-bottom">
						            <div class="mb-2 ml-2 mr-3 mt-1 avatar">     
						                <img
						                	   :src="post.user.avatar_path"
						                	   class="img-fluid rounded-circle" 
						                    />                                                
						            </div>            
						            <div class="post_details">
						            	<div>
						            		<a href="#" class="font-weight-bold mr-1">
						                    {{ post.user.name }}
						                	</a>
						                	<span>
						                		{{ post.description }}
						                	</span>
						            	</div>
						            	<div>
						            		{{ ago }}
						            	</div>
						        	</div>
						        </div>
						        
								<comments-item v-for="comment in comments" :comment ="comment" :key="comment.id">
									
								</comments-item>			
								

							</div>	
				        </div>


						

					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import { mapGetters } from "vuex";
	import store from "../store";
	import CommentsAddNew from './CommentsAddNew';
	import CommentsItem from './CommentsItem';
	import moment from 'moment';
	import {FETCH_POST, FETCH_COMMENTS} from '../store/actions.type';

	export default {	
		name: 'CommentsList',

		beforeRouteEnter(to, from, next) {
			Promise.all([
			      store.dispatch(FETCH_POST, to.params.id),
			      store.dispatch(FETCH_COMMENTS, to.params.id)
			    ]).then(() => {
			      next();			      
			    });
		},

		computed: {			

			ago(){
                return moment(this.post.created_at).fromNow();
        	},

        	...mapGetters(["post", "comments"])

		},							

		components: { CommentsAddNew, CommentsItem }		

		
	}
	
</script>
<style scoped>

	h1{
		font-size: 2rem;
		margin-bottom: 0;
	}

	.comments{
		background-color: white;		
	}	

	a{
		display: inline;
		color: #636b6f;
		padding: 0;
	}

	.post {
	    flex: 1;
	    display: flex;
	    overflow: auto;		    
	}

	.box {
	    display: flex;
	    min-height: min-content;
	    flex-direction: column;
	}


	
</style>