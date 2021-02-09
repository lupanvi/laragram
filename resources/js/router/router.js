import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '../components/App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PostsEdit from '../pages/Posts/Edit';
import PostsAddNew from '../pages/Posts/New';
import CommentsList from '../pages/Comments';

import store from '../store';
import guest from './middleware/guest';
import auth from './middleware/auth';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
  	{ path: '/',   		      
      component: App,
      name: "app",      
      meta: {
              middleware: [ auth ]
      },            

      children : [
        {
          path: "",
          name: "home",
          component: Home          
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
      meta: {
                middleware: [
                    guest
                ]
            }
    }    

  ]
});

router.beforeEach((to, from, next) => {                
    
    //check if route or parent route has middleware    
    if (!to.matched.some(record => record.meta.middleware)) {    
        return next()
    }    

    //extract the middleware
    const {meta} = to.matched.find(record => record.meta.middleware);     

      const context = {
          to,
          from,
          next,
          store
      }

      return meta.middleware[0]({
          ...context
      })      

});

export default router;