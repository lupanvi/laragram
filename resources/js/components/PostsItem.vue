<template>

	<div class="post">                                                 
            
              <div class="header_post d-flex align-items-center justify-content-between">

                    <div class="d-flex align-items-center">
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

                            <i class="far fa-comment" @click.prevent="showAllcomments"></i>

                        </div>

                        <div class="likes">
                            <span v-text="likesCount"></span> likes
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

                    <div>
                        <a class="all_comments_link" v-if="showAllCommentsLink" @click.prevent="showAllcomments" href="#">See {{ commentsCount }} comments</a>
                    </div>
                    

                    <div class="time_ago mb-2">
                        {{ ago }}
                    </div>

                </div>

            </div>
	
</template>
<script>

    import moment from 'moment';

	export default{
        name: 'PostsItem',        
		props: {
            post: {
                type: Object,
                required: true
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
                likesCount : this.post.likesCount,
                readMoreButton : false,
                descriptionSummary: '',
                commentsCount: this.post.commentsCount,
                path: this.post.path                               
            };
        },

        computed: {

            ago(){
                return moment(this.post.created_at).fromNow();
            },                       

            showAllCommentsLink(){
                return this.commentsCount > 2 ? true: false
            }

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

                axios.post(`${this.path}/likes`);
                this.liked = true;
                this.likesCount++;

            },

            dislike(){
                axios.post(`${this.path}/dislike`);
                this.liked = false;
                this.likesCount--;                
            },

            moreOptions(){
                this.$modal.show('more-options-modal', {post: this.post});                
            },

            readMore(){
                this.readMoreButton = false;                
            },

            showAllcomments(){
                this.$router.push({
                    name:'comments.index', 
                    params: { id: this.id }
                });
            }
        }
	}
</script>
<style scoped>

.post{
    background-color: #fff;
    margin-bottom:2rem;          
}

.username, .likes{
    font-weight: bold;
}

.social i{
    font-size: 20px; 
    cursor: pointer;                       
    
}    

.more_options{
    background: transparent;
    font-size: 1.5rem;
    border: none;    
}

.time_ago{
    color: #8e8e8e;
    font-size: 0.8rem;
} 

.all_comments_link{
    color: #8e8e8e;
}

    
</style>