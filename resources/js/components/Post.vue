<template>

	<div class="post">                                                 
            
              <div class="header_post d-flex align-items-center justify-content-between">

                    <div class="d-flex align-items-center ">
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
                    
                    <button type="button" class="more_options mr-2" @click.prevent="moreOptions">...</button>                                                                                        
                </div>                        

                <div class="image">

                    <figure :class="filter">
                        <img :src="imagePath" class="img-fluid" />
                    </figure>

                    <div class="info">
                
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
                                <p v-text="description"></p>
                            </div>    
                        </div>
                    </div>

                </div>                                            


            </div>
	
</template>
<script>

    import EventBus from '../event-bus.js';

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

        watch:{

            post(val){
                this.description = val.description;
            }

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
            },

            moreOptions(){
                this.$modal.show('edit-modal', {post: this.post});                
            }
        }
	}
</script>