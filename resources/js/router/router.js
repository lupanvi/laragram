import Vue from 'vue';
import VueRouter from 'vue-router';
import PostsList from '../components/PostsList';
import Login from '../components/Login';
import Register from '../components/Register';
import PostsEdit from '../components/PostsEdit';
import PostsAddNew from '../components/PostsAddNew';
import CommentsList from '../components/CommentsList';
import Main from '../components/Main';
import store from '../store';
import guest from './middleware/guest';
import auth from './middleware/auth';
//import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
  	{ path: '/',   		      
      component: Main,
      name: "main",      
      meta: {
              middleware: [ auth ]
      },      
      //meta: { requiresAuth: true },

      children : [
        {
          path: "",
          name: "home",
          component: PostsList,
          //meta: { requiresAuth: true }          
          meta: {
              middleware: [ auth ]
          }        
          
        },

        { 
          path: '/posts/edit/:id', 
          component: PostsEdit, 
          name: 'posts.edit',
          props: true,
          meta: {
              middleware: [ auth ]
          }
        },
        { 
          path: '/posts/create', 
          component: PostsAddNew, 
          name: 'posts.create',
          props: true,
          meta: {
              middleware: [ auth ]
          }
        },
        {
          path:'/posts/:id/comments',
          component: CommentsList,
          name:'comments.index',
          props: true,
          meta: {
              middleware: [ auth ]
          }
        }

      ]	
  	},    
    { 
    	path: '/login',       
    	component: Login, 
    	name:'login',      
      //meta: { requiresVisitor: true }
      meta: {
                middleware: [
                    guest
                ]
            }
    },
    { 
    	path: '/register',       
    	component: Register, 
    	name: 'register',
      //meta: { requiresVisitor: true }
      meta: {
                middleware: [
                    guest
                ]
            }
    }    

  ]
});

router.beforeEach((to, from, next) => {        

    //if (!to.matched.some(record => record.meta.middleware)) { 
    //if (to.matched.some(record => record.meta.middleware)) { 
    console.log('beforeEach.js enter', to.meta.middleware)

    if (!to.meta.middleware){
        return next()
    }

    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context
    })  
    

});

/*
router.beforeEach((to, from, next) => {

  console.log(to);
  console.log('beforeEach', store.getters.isAuthenticated);

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