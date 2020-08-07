import { FETCH_POSTS, POST_DELETE } from "./actions.type";
import { 
  FETCH_START, 
  FETCH_END, 
  UPDATE_POST_IN_LIST, 
  REMOVE_POST_IN_LIST 
} from "./mutations.type";

const state = {
	posts: [],
  isLoading: false  
};

const actions = {
	
	[FETCH_POSTS]({commit}){
    commit(FETCH_START); 
		axios.get('/posts').then(({data})=>{
			commit(FETCH_END, data);                
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

  [FETCH_START](state) {
    state.isLoading = true;
  },

  [FETCH_END](state, posts) {
    state.posts = posts;    
    state.isLoading = false;
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
  },
  isLoading(state) {
    return state.isLoading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};