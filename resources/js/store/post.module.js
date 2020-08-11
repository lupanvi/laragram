import Vue from "vue";
import { 
	POST_EDIT, 
	POST_PUBLISH, 
	FETCH_POST,
	POST_RESET_STATE,
	FETCH_COMMENTS,
	COMMENT_CREATE,
	LIKE_ADD,
	LIKE_REMOVE

} from "./actions.type";

import { 
  SET_POST, 
  RESET_STATE,
  SET_COMMENTS, 
  UPDATE_POST_IN_LIST, 
  REMOVE_POST_IN_LIST 
} from "./mutations.type";

const initialState = {

	post: {
		id:'',
		description: '',
		filter: '',
		image_path: '',
		created_at:'',
		path:'',		
		user:{}
	},

	comments:[]	

};

const state = { ...initialState };

const actions = {
	
	[POST_EDIT]({state}){
		return axios.patch('/posts/'+state.post.id, {'description': state.post.description});          
	},

	[POST_PUBLISH](context, post){
		return axios.post('/posts', post);
	},

	[FETCH_POST]({commit}, postId){
		return axios.get('/posts/'+postId)
			 .then(({data})=>{
				commit(SET_POST, data);
			 });		
		
	},

	[POST_RESET_STATE]({commit}){
		commit(RESET_STATE);
	},

	[FETCH_COMMENTS]({commit}, postId){
		return axios.get('/posts/' + postId + '/comments/all')
					.then(({data}) => {					 
					 	commit(SET_COMMENTS, data);					 						 						 	
					});
	},

	[COMMENT_CREATE]({dispatch}, payload){
		return axios.post(payload.path+'/comments', {body: payload.body})				     
					 .then(({data})=>{
					 	dispatch(FETCH_COMMENTS, payload.postId);					 	
					 });
	},

	[LIKE_ADD]({commit},postPath){
		return axios.post(`${postPath}/likes`)
					.then(({data})=>{
						commit(UPDATE_POST_IN_LIST, data, { root: true });
						commit(SET_POST, data);
					});            
	},

	[LIKE_REMOVE]({commit}, postPath){
		return axios.post(`${postPath}/dislike`)
					.then(({data})=>{
						commit(UPDATE_POST_IN_LIST, data, { root: true });
						commit(SET_POST, data);
					});
	}
	
};


const mutations = {

	[SET_POST](state, post) {
    	state.post = post;
  	},

  	[RESET_STATE](){
  		for (let f in state) {
	      Vue.set(state, f, initialState[f]);
	    }
  	},

  	[SET_COMMENTS](state, comments){
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