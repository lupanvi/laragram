import VueRouter from 'vue-router';
import PostsList from './components/PostsList';
import Login from './components/Login';
import Register from './components/Register';
import PostsEdit from './components/PostsEdit';
import PostsAddNew from './components/PostsAddNew';
import CommentsList from './components/CommentsList';
import Main from './components/Main';
import store from './store'

const requireLogin = (to, from, next) =>{ 

  if (store.getters.isAuthenticated && to.path !== '/login' && to.path !== '/register') {        
        next();        
  } else {      
      next({
          name: 'login'            
      })
  }
}



const router = new VueRouter({
  mode: 'history',
  routes: [
  	{ path: '/',   		
      beforeEnter: requireLogin,
      component: Main,      
      children : [
        {
          path: "",
          name: "home",
          component: PostsList
        },

        { 
          path: '/posts/edit/:id', 
          component: PostsEdit, 
          name: 'posts.edit',
          props: true 
        },
        { 
          path: '/posts/create', 
          component: PostsAddNew, 
          name: 'posts.create',
          props: true
        },
        {
          path:'/posts/:id/comments',
          component: CommentsList,
          name:'comments.index',
          props: true
        }

      ]	
  	},    
    { 
    	path: '/login', 
    	component: Login, 
    	name:'login' 
    },
    { 
    	path: '/register', 
    	component: Register, 
    	name: 'register' 
    }    

  ]
});




export default router;