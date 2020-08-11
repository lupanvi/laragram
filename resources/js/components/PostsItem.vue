<template>

	<div class="post">                                                 
            
              <div class="header_post d-flex align-items-center justify-content-between">

                    <div class="d-flex align-items-center">
                        <div class="m-2 avatar">     
                            <img 
                            	   :src="post.user.avatar_path"
                            	   class="img-fluid rounded-circle" 
                                />                                                
                        </div>
                        
                        <div class="username">
                            {{ post.user.name }}
                        </div>
                    </div>                    
                    
                    <button type="button" class="more_options mr-2" @click.prevent="moreOptions">...</button>                                                                                        
                </div>                        

                <div class="image">

                    <figure :class="post.filter">
                        <img :src="post.image_path" class="img-fluid" />
                    </figure>                    

                </div>       

                <div class="details pl-3 pr-3">
                    <div class="info">
                    
                        <div class="social">                
                            <i class="fas fa-heart" :class="post.liked ? 'liked' : ''" @click="toggle"></i>

                            <i class="far fa-comment" @click.prevent="showAllcomments"></i>

                        </div>

                        <div class="likes">
                            <span v-text="post.likesCount"></span> likes
                        </div>                        
                        
                        <div class="description">
                            <p>
                                <span class="username pr-1">{{ post.user.name }}</span>
                                <span v-if="readMoreButton">
                                    {{ descriptionSummary }}...
                                    <a href="#" @click.prevent="readMore">more</a>
                                </span>
                                <span v-else>
                                    {{ post.description }}
                                </span>                                
                            </p>
                        </div>    
                        
                    </div>

                    <div>
                        <a class="all_comments_link" 
                            v-if="post.commentsCount" 
                            @click.prevent="showAllcomments" 
                            href="#"
                        >
                            See {{ post.commentsCount }} comments
                        </a>
                    </div>
                    

                    <div class="time_ago mb-2">
                        {{ ago }}
                    </div>

                </div>

            </div>
	
</template>
<script>

    import moment from 'moment';
    import { LIKE_ADD, LIKE_REMOVE } from "../store/actions.type";

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
                readMoreButton : false,
                descriptionSummary: ''
            };
        },

        computed: {

            ago(){
                return moment(this.post.created_at).fromNow();
            }            

        },     

        created(){  

            if(this.post.description === null) {                           
                return false;
            }

            if (this.post.description.length > 120){
                this.descriptionSummary = this.post.description.substring(0,120);
                this.readMoreButton = true;
            }

        },                                 

        methods:{
            toggle(){
                this.post.liked ? this.dislike() : this.like();                
            },

            like(){
                this.$store.dispatch(LIKE_ADD, this.post.path);
            },

            dislike(){
                this.$store.dispatch(LIKE_REMOVE, this.post.path);                                
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
                    params: { id: this.post.id }
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