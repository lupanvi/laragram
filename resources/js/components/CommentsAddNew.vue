<template>
	<div class="new-comment d-flex justify-content-between align-items-center p-3 mb-3 border-top">
		<textarea autocomplete="off" class="body flex-grow-1" type="text" v-model="body" placeholder="Add a comment..." />
		<button class="publish font-weight-bold" :disabled="disabled" type="button" @click="addComment">Publish</button>
	</div>
</template>
<script>
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
					.dispatch('createComment', {
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
	/*min-height: 56px;	*/
}

.body{
	height: 18px;
	/*max-height: 80px;*/
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