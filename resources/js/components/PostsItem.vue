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

                </div>       

                <div class="details pl-3 pr-3">
                    <div class="info">
                    
                        <div class="social">                
                            <i class="fas fa-heart" :class="liked ? 'liked' : ''" @click="toggle"></i>
                        </div>

                        <div class="likes">
                            <span v-text="likes_count"></span> likes
                        </div>                        
                        
                        <div class="description">
                            <p>
                                <span class="username pr-1">{{ userName }}</span>
                                <span v-if="readMoreButton">
                                    {{ descriptionSummary }}...
                                    <a href="#" @click.prevent="readMore">more</a>
                                </span>
                                <span v-else>
                                    {{ description }}
                                </span>                                
                            </p>
                        </div>    
                        
                    </div> 

                    <comments-list 
                        :comments="comments" 
                        :ago="ago" 
                        :path="path">                            
                    </comments-list>
                </div>

            </div>
	
</template>
<script>

    import EventBus from '../event-bus.js';
    import CommentsList from './CommentsList';
    import moment from 'moment';

	export default{
        name: 'PostsItem',        
		props: {
            post: {
                type: Object,
                required: true
            }
        },        

        components:{ CommentsList }, 

        computed: {

            ago(){
                return moment(this.post.created_at).fromNow();
            }

        },     

		data(){
			return {
                id:this.post.id,
                avatarPath: this.post.user.avatar_path,
                userName:this.post.user.name,
                imagePath:this.post.image_path,                
                description: this.post.description,
                filter:this.post.filter,
                liked: this.post.liked,
                likes_count : this.post.likesCount,
                readMoreButton : false,
                descriptionSummary: '',
                comments: this.post.comments,
                path: this.post.path                
			};
		},

        created(){

            if (this.description.length > 120){
                this.descriptionSummary = this.post.description.substring(0,120);
                this.readMoreButton = true;
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
                this.$modal.show('more-options-modal', {post: this.post});                
            },

            readMore(){
                this.readMoreButton = false;                
            }
        }
	}
</script>
<style scoped>

.more_options{
    background: transparent;
    font-size: 1.5rem;
    border: none;
}
    
</style>