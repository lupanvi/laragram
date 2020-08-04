import Vue from "vue";

const initialState = {

	post: {
		id:'',
		description: '',
		filter: '',
		image_path: '',
		created_at:'',
		path:'',
		liked: '',
		likesCount: '',
		user:{}
	},

	comments:[]	

};

const state = { ...initialState };

const actions = {
	
	editPost({state}){
		return axios.patch('/posts/'+state.post.id, {'description': state.post.description});          
	},

	addPost(context, post){
		return axios.post('/posts', post);
	},

	fetchPost({commit}, postId){
		return axios.get('/posts/'+postId)
			 .then(({data})=>{

				commit('SET_POST', data);

			 });		
		
	},

	resetStatePost({commit}){
		commit('RESET_STATE');
	},

	fetchComments({commit}, postId){

		return axios.get('/posts/' + postId + '/comments/all')
					.then(({data}) => {					 
					 	commit('SET_COMMENTS', data);					 						 						 	
					});		

	},

	createComment({dispatch}, payload){
		return axios.post(payload.path+'/comments', {body: payload.body})				     
					 .then(({data})=>{
					 	dispatch('fetchComments', payload.postId);					 	
					 });
	},

	addLike({commit},postPath){
		return axios.post(`${postPath}/likes`)
					.then(({data})=>{

						commit('UPDATE_POST_IN_LIST', data, { root: true });
						commit('SET_POST',data);

					});
            
	},

	removeLike({commit}, postPath){
		return axios.post(`${postPath}/dislike`)
					.then(({data})=>{

						commit('UPDATE_POST_IN_LIST', data, { root: true });
						commit('SET_POST',data);

					});
	}
	
};


const mutations = {

	SET_POST(state, post) {
    	state.post = post;
  	},

  	RESET_STATE(){

  		for (let f in state) {
	      Vue.set(state, f, initialState[f]);
	    }

  	},

  	SET_COMMENTS(state, comments){
  		state.comments = comments;
  	}


};

const getters = {
	post(state) {
    	return state.post;
  	},
  	comments(state){
  		return state.comments;
  	}
};

export default {
	state,	
	actions,
	mutations,
	getters
}