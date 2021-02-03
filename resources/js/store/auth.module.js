import Vue from 'vue';
import {LOGIN, LOGOUT, REGISTER, CHECK_AUTH} from "./actions.type";
import {SET_AUTH, PURGE_AUTH, SET_ERROR} from './mutations.type';

const state = {  
  user: null,  
  isAuthenticated: false,  
  errors: null
};

const getters = {
  
  isAuthenticated(state){
      return state.isAuthenticated;
  },
  currentUser(state){
      return state.user;
  },
  errors(state){
    return state.errors
  }  

};

const actions = {
  async [LOGIN]({commit, dispatch}, credentials) {  

    try{
      await axios.get('/sanctum/csrf-cookie')    
      await axios.post("/login", credentials)              
      return dispatch(CHECK_AUTH);
    }catch(error){
      commit(SET_ERROR, error.response.data.message)
    }    
    
  },

  [CHECK_AUTH]({commit}) { 
    
    return axios.get('/api/user').then(({data}) => {    
        commit(SET_AUTH, data)          
      }).catch((error) => {    
        commit(SET_AUTH, null);    
      })

  },

  [LOGOUT]({commit}) {
    
    return axios.post('/logout').then(response => {
              commit(PURGE_AUTH);                
            });              
    
  },

  [REGISTER](context, credentials) {
    
    return axios.post("/register", credentials)        
            .catch(({ response }) => {
              context.commit(SET_ERROR, response.data.errors);              
            });
    
  }

};

const mutations = {  

  [SET_ERROR](state, error) {
    state.errors = error;    
  },

  [SET_AUTH](state, payload) {    
    state.user = payload.user;
    state.isAuthenticated = Boolean(payload.user);                
  },
  [PURGE_AUTH](state) {    
    state.isAuthenticated = false;    
    state.user = null;     
  }

};

export default {
  state,
  actions,
  mutations,
  getters
};