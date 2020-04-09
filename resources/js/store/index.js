import Vuex from 'vuex'
import Vue from 'vue'

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
				commit('setPosts', data);                
            });		

		},

		removePost({commit}, postId){
			axios.delete('/posts/'+ postId).then(()=>{
				commit('REMOVE_POST', postId );
            }); 
		}

	},

	mutations:{

		setPosts(state, posts){			
			state.posts = posts;
		},

		REMOVE_POST(state, postId){
            this.state.posts = this.state.posts.filter((post)=>{
                return post.id !== postId
            });
        }

	}

})
