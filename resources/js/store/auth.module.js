import Vue from 'vue';
import {LOGIN, LOGOUT, REGISTER, CHECK_AUTH} from "./actions.type";
import {SET_AUTH, PURGE_AUTH, SET_ERROR} from './mutations.type';
import JwtService from "../jwt.service";

const state = {  
  user: null,
  isAuthenticated: !!JwtService.getToken(),  
  errors: null
};

const getters = {
  
  isAuthenticated(state){
      return state.isAuthenticated;
  },
  currentUser(state){
      return state.user;
  },

  checkUser(state){
    return state.user !== null 
  } 

};

const actions = {
  async [LOGIN]({commit}, credentials) {  	

    await axios.get('/sanctum/csrf-cookie');       
    const {data} = await axios.post("/login", credentials); 
    commit(SET_AUTH, data);

  },

  [CHECK_AUTH]({commit}) {       

    return axios.get('/api/user')
         .then(({data})=>{                     
            commit(SET_AUTH, data);             
         });           

               

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
    state.isAuthenticated = true;        
    state.user = payload.user;
    JwtService.saveToken("true"); 
  },
  [PURGE_AUTH](state) {    
    state.isAuthenticated = false;    
    state.user = null; 
    JwtService.destroyToken();
  }

};

export default {
  state,
  actions,
  mutations,
  getters
};