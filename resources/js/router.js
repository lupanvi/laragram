import VueRouter from 'vue-router';
import PostsList from './components/PostsList';
import Login from './components/Login';
import Register from './components/Register';
import PostsEdit from './components/PostsEdit';
import PostsAddNew from './components/PostsAddNew';
import CommentsList from './components/CommentsList';
import Main from './components/Main';
import { mapGetters } from "vuex";

const router = new VueRouter({
  mode: 'history',
  routes: [
  	{ path: '/',   		
      //beforeEnter: requireLogin,
      component: Main,
      meta: {
            requiresAuth: true
      },
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

const requireLogin = () =>{  

	if (mapGetters('isAuthenticated')) {
        next(true);
  } else {
      next({
          name: 'login'            
      })
  }

}
/*
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', 
      beforeEnter: requireLogin,
      component: PostsList    
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
});

const requireLogin = () =>{

  if (window.App.signedIn) {
        next(true);
    } else {
        next({
            name: 'login'            
        })
    }

}*/

export default router;