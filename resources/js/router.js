import VueRouter from 'vue-router';
import PostsList from './components/PostsList';
import Login from './components/Login';
import Register from './components/Register';
import PostsEdit from './components/PostsEdit';
import PostsAddNew from './components/PostsAddNew';
import CommentsList from './components/CommentsList';
import Main from './components/Main';
import store from './store';
//import jwt from './jwt.service.js';

const checkLogin = (to, from, next) =>{    

  if (to.matched.some(record => record.meta.requiresAuth)) { 

    if (!store.getters.isAuthenticated){          
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

}

const router = new VueRouter({
  mode: 'history',
  routes: [
  	{ path: '/',   		
      beforeEnter: checkLogin,
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
      beforeEnter: checkLogin,
    	component: Login, 
    	name:'login',
      meta: { requiresVisitor: true } 
    },
    { 
    	path: '/register', 
      beforeEnter: checkLogin,
    	component: Register, 
    	name: 'register',
      meta: { requiresVisitor: true }  
    }    

  ]
});


/*router.beforeEach((to, from, next) => {

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

});*/



export default router;