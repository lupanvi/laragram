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
import { FETCH_POSTS } from "../store/actions.type";
import store from "../store";

export default {  

    name: 'PostsList',

    components:{ PostsItem },

    beforeRouteEnter(to, from, next) {
       store.dispatch(FETCH_POSTS);                        
       return next();
    },

    computed:{

        ...mapGetters(['postsList'])                

    }
}
</script>