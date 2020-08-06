
const state = { 
	posts: []		
};

const getters = {

	postsList(state, getters){

		return state.posts

	}

};

const actions =  {
	
	fetchPosts({commit}){			

		axios.get('/posts').then(({data})=>{            
			commit('SET_POSTS', data);                
        });		

	},
	
	removePost({commit}, postId){
		axios.delete('/posts/'+ postId).then(()=>{
			commit('REMOVE_POST', postId );
        }); 
	}	


};

const mutations = {

	SET_POSTS(state, posts){			
		state.posts = posts;
	},

	REMOVE_POST(state, postId){
        state.posts = state.posts.filter((post)=>{
            return post.id !== postId
        });
    },
    UPDATE_POST_IN_LIST(state, data) {
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

export default {
  state,
  getters,
  actions,
  mutations
};