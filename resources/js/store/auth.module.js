import Vue from 'vue';
import {LOGIN, LOGOUT, REGISTER, CHECK_AUTH} from "./actions.type";
import {SET_AUTH, PURGE_AUTH, SET_ERROR} from './mutations.type';
import JwtService from "../jwt.service";

const state = {  
  user: {},
  isAuthenticated: !!JwtService.getToken(),    
  errors: null
};

const getters = {
  
  isAuthenticated(state){
      return state.isAuthenticated;
  },
  currentUser(state){
      return state.user;
  }  
  
};

const actions = {
  [LOGIN]({commit}, credentials) {

  	return new Promise((resolve, reject) => {

      axios.get('/sanctum/csrf-cookie').then(response => {        

        axios
          .post("/login", credentials)
          .then(({ data }) => {      
            console.log(data);
            return false;                  
            commit(SET_AUTH, data);            
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });

      });	        

    });

  },

  [CHECK_AUTH]({commit}) {     
    
    if (JwtService.getToken()) {
    
        axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;

        axios.post('/auth/me')
             .then(({data})=>{                     
                commit(SET_AUTH, data);                      
             })
             .catch(()=>{                       
                commit(PURGE_AUTH);                    
              });
          
    } else {          
      commit(PURGE_AUTH);          
      
    }     

  },

  [LOGOUT]({commit}) {

    return new Promise((resolve, reject) => {
        axios
          .post("/auth/logout")
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
      axios.post("/auth/register", credentials)
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
    JwtService.saveToken(payload.access_token);   
  },
  [PURGE_AUTH](state) {    
    state.isAuthenticated = false;    
    JwtService.destroyToken();
  }

};

export default {
  state,
  actions,
  mutations,
  getters
};