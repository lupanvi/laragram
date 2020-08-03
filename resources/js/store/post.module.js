import Vue from "vue";

const initialState = {

	post: {
		id:'',
		description: '',
		filter: '',
		image_path: ''
	}

};

const state = { ...initialState };

const actions = {
	
	editPost({state}){
		return axios.patch('/posts/'+state.post.id, {'description': state.post.description});          
	},

	addPost(context, post){
		return axios.post('/posts', post);
	},

	fetchPost({commit}, id){
		axios.get('/posts/'+id)
			 .then(({data})=>{

				commit('SET_POST', {
					id: data.id,
					description: data.description,
					filter: data.filter,
					image_path: data.image_path
				});

			 });		
		
	},

	resetStatePost({commit}){
		commit('RESET_STATE');
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

  	}


};

const getters = {
	post(state) {
    	return state.post;
  	}
};

export default {
	state,	
	actions,
	mutations,
	getters
}