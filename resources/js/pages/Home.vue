<template>    
    <div class="posts">        
        <post-item v-for="post in postsList" :post="post" :key="post.id"></post-item>
        <div v-if="postsList.length == 0">There are no images</div>        
    </div>           
</template>

<script>
import PostItem from '../components/Post';
import {mapGetters, mapActions} from 'vuex';
import { FETCH_POSTS } from "../store/actions.type";
import store from "../store";
export default {  
    name: 'Home',
    components:{ PostItem },
    beforeRouteEnter(to, from, next) {
       store.dispatch(FETCH_POSTS);                        
       return next();
    },    
    computed:{
        ...mapGetters(['postsList'])                
    }
}
</script>