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
      await axios.post("/login", credentials)        
      //commit(SET_AUTH, data);
      return dispatch(CHECK_AUTH);
    }catch(error){
      commit(SET_ERROR, error.response.data.message)
    }    
    
  },

  [CHECK_AUTH]({commit}) { 
    console.log('CHECK_AUTH-1');
    return axios.get('/api/user').then(({data}) => {
        console.log('CHECK_AUTH-2');
        commit(SET_AUTH, data)      
        console.log('CHECK_AUTH-3');  
      }).catch((error) => {
        console.log('CHECK_AUTH-4');
        commit(SET_AUTH, null);
        console.log('CHECK_AUTH-5');
      })

      console.log('CHECK_AUTH-6');
      
      /*console.log('CHECK_AUTH-1');
      try{        
        console.log('CHECK_AUTH-2');
        const response = await axios.get('/api/user');                                        
        const data = response.data;
        console.log('CHECK_AUTH-3');
        commit(SET_AUTH, data);  
        console.log('CHECK_AUTH-4');                         
        }catch(e){               
        console.log('CHECK_AUTH-5'); 
        commit(SET_AUTH, null);  
        console.log('CHECK_AUTH-6');                     
      } 
      console.log('CHECK_AUTH-7');*/
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