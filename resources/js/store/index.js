import Vuex from 'vuex'
import Vue from 'vue'
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({

	state:{ 
		posts: []		
	},

	getters:{

		postsList(state, getters){			

			return state.posts

		}

	},

	actions: {

		fetchPosts({commit}){			

			axios.get('/posts').then(({data})=>{            
				commit('SET_POSTS', data);                
            });		

		},

		removePost({commit}, postId){
			axios.delete('/posts/'+ postId).then(()=>{
				commit('REMOVE_POST', postId );
            }); 
		},

		editPost({commit}, post){
			axios
                .patch('/posts/'+post.id, {'description': post.description})
                .then(()=>{
                   router.push('/');	                    												                      
			    });
		}

	},

	mutations:{

		SET_POSTS(state, posts){			
			state.posts = posts;
		},

		REMOVE_POST(state, postId){
            this.state.posts = this.state.posts.filter((post)=>{
                return post.id !== postId
            });
        }

	}

})
