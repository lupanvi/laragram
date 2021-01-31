import VueRouter from 'vue-router';
import PostsList from './components/PostsList';
import Login from './components/Login';
import Register from './components/Register';
import PostsEdit from './components/PostsEdit';
import PostsAddNew from './components/PostsAddNew';
import CommentsList from './components/CommentsList';
import Main from './components/Main';
import store from './store';
import { CHECK_AUTH } from "./store/actions.type";


const router = new VueRouter({
  mode: 'history',
  routes: [
  	{ path: '/',   		      
      component: Main,
      meta: { requiresAuth: true },       
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
    	name:'login',
      meta: { requiresVisitor: true } 
    },
    { 
    	path: '/register',       
    	component: Register, 
    	name: 'register',
      meta: { requiresVisitor: true }  
    }    

  ]
});

router.beforeEach((to, from, next) => {  

  if (to.matched.some(record => record.meta.requiresAuth)) {    
    if (!store.getters.isAuthenticated) {
      next({name: 'login' })
    } else {
      next()
    }

  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isAuthenticated) {
      next({name: 'home' })
    } else {
      next()
    }

  } else {
    next()
  }

});



export default router;