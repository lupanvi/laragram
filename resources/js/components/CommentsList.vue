<template>
	<div class="comments">
		<div class="container">           
            <div class="row justify-content-center">
                <div class="col-lg-6 mt-3">

                	<div v-if="loading" class="loading text-center">
                		<i class="fas fa-circle-notch fa-spin"></i>
                	</div> 

					<div class="header d-flex align-items-center">

						<a class="mr-4 return" href="#" @click.prevent="$router.push('/')">
							<i class="fas fa-arrow-left"></i>
						</a>
						<h1>Comments</h1>
						
					</div>		

					 <div class="post">	
						 <div class="d-flex align-">
				            <div class="m-2 avatar">     
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
			        </div> 			
					

					<div v-for="comment in comments" >			
						<comments-item :comment ="comment" :key="comment.id"></comments-item>			
					</div>		

					<comments-add-new :path="post.path" @addComment="add"></comments-add-new>

				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import CommentsAddNew from './CommentsAddNew';
	import CommentsItem from './CommentsItem';
	import moment from 'moment';

	export default {	
		name: 'CommentsList',		

		computed: {

			ago(){
                return moment(this.post.created_at).fromNow();
        	}

		},		

		data(){
			return {
				comments: [],
				post: {},
				loading: false
			}
		},

		created(){
			
			 this.loading = true;
			 this.getComments();	
			
		},	

		components: { CommentsAddNew, CommentsItem },		

		methods:{

			add(comment){
				this.comments.push(comment);
			},
			
			getComments(){

				axios.get('/posts/'+this.$route.params.id+'/comments/all')
					 .then(({data}) => {
					 	this.post = data.post;
					 	this.comments = data.comments;
					 	this.loading = false;
					 });

			}			

		}

		
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
	
</style>