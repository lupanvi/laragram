<template>

	<div class="post">                                        
            
              <div class="header_post d-flex align-items-center">
                    <div class="m-2 avatar">                        
                        
                            <img 
                        	   :src="avatarPath"
                        	   class="img-fluid rounded-circle" 
                            />                        
                        
                    </div>
                    
                    <div class="username">
                        {{ userName }}
                    </div>
                        
                    
                </div>                        
                <div class="image">

                    <figure :class="filter">
                        <img :src="imagePath" class="img-fluid" />
                    </figure>

                </div>                       

                <div class="social m-2">                
                    <i class="fas fa-heart" :class="liked ? 'liked' : ''" @click="toggle"></i>
                </div>

                <div class="likes ml-2">
                    <span v-text="likes_count"></span> likes
                </div>
                
                <div class="d-flex ml-2">
                    <div class="username pr-1">                            
                        {{ userName }}
                    </div>

                    <div class="description">
                        <p>{{ description }}</p>
                    </div>    
                </div>
                


            </div>
	
</template>
<script>
	export default{
		props:['post'],

		data(){
			return {
                id:this.post.id,
                avatarPath: this.post.user.avatar_path,
                userName:this.post.user.name,
                imagePath:this.post.image_path,                
                description: this.post.description,
                filter:this.post.filter,
                liked: this.post.liked,
                likes_count : this.post.likesCount
			};
		},
       

        methods:{
            toggle(){
                this.liked ? this.dislike() : this.like();                
            },

            like(){

                axios.post(`/posts/${this.id}/likes`);
                this.liked = true;
                this.likes_count++;

            },

            dislike(){
                axios.post(`/posts/${this.id}/dislike`);
                this.liked = false;
                this.likes_count--;                
            }
        }
	}
</script>