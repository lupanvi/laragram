<template>    
    <div class="posts">        
        <div v-for="post in posts" :key="post.id">
            <post :post="post"></post>
        </div>         
        <div v-if="posts.length == 0">No hay publicaciones</div>        
    </div>           
</template>
<script>

import Post from './Post'; 
import EventBus from '../event-bus.js';   

export default {    

    data(){
        return {
            posts: []
        }
    },

    components:{Post},

    created(){
        
        axios.get('/posts').then(({data})=>{
            this.posts = data;            
        });

        EventBus.$on('addNewPost', evt => {
            this.posts.unshift(evt.newPost);
        });

    }

}
</script>