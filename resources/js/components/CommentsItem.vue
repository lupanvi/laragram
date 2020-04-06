<template>
	<div class="comment">					
		<p> <a href="#" class="font-weight-bold">{{ comment.owner.name }}</a> {{ comment.body }}</p>		
	</div>
</template>
<script>
export default{

	name: 'CommentsItem',
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