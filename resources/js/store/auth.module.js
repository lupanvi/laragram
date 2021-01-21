import Vue from 'vue';
import {LOGIN, LOGOUT, REGISTER, CHECK_AUTH} from "./actions.type";
import {SET_AUTH, PURGE_AUTH, SET_ERROR} from './mutations.type';
//import JwtService from "../jwt.service";

const state = {  
  user: null,
  //isAuthenticated: !!JwtService.getToken(),  
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
      const {data} = await axios.post("/login", credentials)        
      commit(SET_AUTH, data);
    }catch(error){
      commit(SET_ERROR, error.response.data.message)
    }    
    
  },

  async [CHECK_AUTH]({commit}) {       
      
      try{
        const {data} = await axios.get('/api/user');                                
        commit(SET_AUTH, data);                   
        }catch(e){        
        commit(SET_AUTH, null);               
      } 

  },

  [LOGOUT]({commit}) {

    return new Promise((resolve, reject) => {
        axios
          .post('/logout')
          .then(response => {
            commit(PURGE_AUTH);
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
    });

    
  },

  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      axios.post("/register", credentials)
        .then(({ data }) => {          
          resolve(true);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
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
    //JwtService.saveToken("true"); 
  },
  [PURGE_AUTH](state) {    
    state.isAuthenticated = false;    
    state.user = null; 
    //JwtService.destroyToken();
  }

};

export default {
  state,
  actions,
  mutations,
  getters
};