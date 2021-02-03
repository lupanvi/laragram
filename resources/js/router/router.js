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