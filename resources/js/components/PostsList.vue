<template>    
    <div class="posts">        
        <div v-for="post in posts" :key="post.id">
            <post :post="post"></post>
        </div>         
        <div v-if="posts.length == 0">There are no images</div>        
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
        
        this.getPosts();        

        EventBus.$on('removePost', evt => {  
            this.getPosts();                         
        });        

    },

    methods:{

        getPosts(){
            axios.get('/posts').then(({data})=>{            
                this.posts = data;            
            });
        }
    }

}
</script>