<template>
	<div class="new-comment border-top border-bottom p-3">
		<div class="bg-white d-flex justify-content-between align-items-center p-1 rounder-pill border">
			<textarea autocomplete="off" class="pl-2 body flex-grow-1 rounded-left rounded-right" type="text" v-model="body" placeholder="Add a comment..." />
			<button class="pr-2 publish font-weight-bold" :disabled="disabled" type="button" @click="addComment">Publish</button>
		</div>
	</div>
</template>
<script>

	import {COMMENT_CREATE} from '../store/actions.type';

	export default{
		name: 'CommentsAddNew',
		props: {
			path:{
				type: String,
				required: true
			},
			id:{
				type: Number,
				required: true
			}
		},
		
		data(){
			return {				
				body:''
			}
		},

		computed: {
			disabled(){
				return this.body !=='' ? false: true;
			}

		},

		methods:{
			addComment(){

				this.$store
					.dispatch(COMMENT_CREATE, {
													path: this.path,
													postId: this.id, 
													body: this.body 
					})
					.then(()=>{
						this.body = '';
					});
					
			}
		}
	}
</script>
<style scoped>
.new-comment{	
	background-color: #efefef !important;
}

.new-comment div{	
	border-radius: 1rem;
}

.body{
	height: 18px;	
	border: none;
	outline: 0;
	padding: 0;
	resize: none;
	line-height: 18px;
	overflow: hidden;
}
.publish{
	border: none;
    color: #0095f6;	            
    background-color: transparent;
    outline:none;    
}

.publish[disabled]{
	opacity:.3;
	pointer-events: none;
}
</style>