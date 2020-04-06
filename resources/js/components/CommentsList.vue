<template>
	<div class="comments">

		<a v-if="showAllCommentsLink" href="#">See {{ comments.length }} comments</a>

		<div v-for="comment in comments" >
			<comments-item :comment ="comment" :key="comment.id"></comments-item>						
		</div>
		<div class="time_ago mb-2">
			{{ ago }}
		</div>

	<comments-add-new :path="path" @addComment="add"></comments-add-new>
		
	</div>
</template>

<script>

	import CommentsAddNew from './CommentsAddNew';
	import CommentsItem from './CommentsItem';

	export default {	
		name: 'CommentsList',
		props: {
			comments:{
				type: Array,
				required: true
			},
			ago: {
				type: String,
				required: true
			},
			path:{
				type: String,
				required : true
			}
		},		

		components: { CommentsAddNew, CommentsItem },

		computed:{
			showAllCommentsLink(){
				return this.comments.length > 2 ? true: false
			}
		},			

		methods:{

			add(comment){
				this.comments.push(comment);
			}

		}

		
	}
	
</script>
<style scoped>

	a{
		display: inline;
	}
	
</style>