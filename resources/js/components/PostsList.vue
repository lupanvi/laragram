<template>    
    <div class="posts">       

        <div v-for="post in postsList" :key="post.id">
            <posts-item :post="post"></posts-item>
        </div>         
        <div v-if="postsList.length == 0">There are no images</div>        
    </div>           
</template>
<script>

import PostsItem from './PostsItem';
import {mapGetters, mapActions} from 'vuex';

export default {  

    name: 'PostsList',

    components:{ PostsItem },

    computed:{

        ...mapGetters(['postsList'])                

    },

    created(){                        
        
        this.fetchPosts();                

    },

    methods:{

        ...mapActions(['fetchPosts'])       

    }

}
</script>