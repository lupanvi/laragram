import {LOGIN, LOGOUT, REGISTER, CHECK_AUTH} from "./actions.type";
import {SET_AUTH, PURGE_AUTH} from './mutations.type';

const state = {  
  user: {},
  isAuthenticated: false
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN]({commit}, credentials) {

  	return new Promise((resolve, reject) => {
      	axios
      		.post("/login", credentials, {
	            headers:{
	                'Content-Type':'application/json',
	                'Accept':'application/json'
	            }
	        })
	        .then(({ data }) => {
	          commit(SET_AUTH, data);
	          resolve(data);
	        })
	        .catch(error => {
	          reject(error);
	        });
    });

  },

  [LOGOUT]({commit}) {
    commit(PURGE_AUTH);
  }

  /*[REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  }*/

};

const mutations = {  
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;    
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};    
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};