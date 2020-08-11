import { FETCH_POSTS, POST_DELETE } from "./actions.type";
import { 
  SET_POSTS,  
  UPDATE_POST_IN_LIST, 
  REMOVE_POST_IN_LIST 
} from "./mutations.type";

const state = {
	posts: []  
};

const actions = {
	
	[FETCH_POSTS]({commit}){    
		axios.get('/posts').then(({data})=>{
			commit(SET_POSTS, data);                
    }).catch(error => {
      throw new Error(error);
    });
	},
	
	[POST_DELETE]({commit}, postId){
		axios.delete('/posts/'+ postId).then(()=>{
			commit(REMOVE_POST_IN_LIST, postId );
    }); 
	}	

};

const mutations = {
 
  [SET_POSTS](state, posts) {
    state.posts = posts;    
  },

	[REMOVE_POST_IN_LIST](state, postId){
        state.posts = state.posts.filter((post)=>{
            return post.id !== postId
        });
  },

  [UPDATE_POST_IN_LIST](state, data){
    state.posts = state.posts.map(post => {
      if (post.id !== data.id) {
        return post;
      }
     
      post.liked = data.liked;
      post.likesCount = data.likesCount;
      return post;
    });
  }

};

const getters = {
  postsList(state){
    return state.posts
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};