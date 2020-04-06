<template>    
    <div class="posts">        
        <div v-for="post in posts" :key="post.id">
            <posts-item :post="post"></posts-item>
        </div>         
        <div v-if="posts.length == 0">There are no images</div>        
    </div>           
</template>
<script>

import PostsItem from './PostsItem'; 
import EventBus from '../event-bus.js';   

export default {  

    name: 'PostsList',

    data(){
        return {
            posts: []
        }
    },

    components:{ PostsItem },

    created(){
        
        this.getPosts()      

        EventBus.$on('removePost', this.removePosts)       

    },

    methods:{

        getPosts(){
            axios.get('/posts').then(({data})=>{            
                this.posts = data;            
            });
        },

        removePosts(postId){
            this.posts = this.posts.filter((post)=>{
                return post.id !== postId
            });
        }


    }

}
</script>