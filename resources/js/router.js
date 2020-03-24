import VueRouter from 'vue-router';
import Posts from './components/PostsList';
import Login from './components/Login';
import Register from './components/Register';
import EditPost from './components/EditPost';
import NewPost from './components/NewPost';

const router = new VueRouter({
  mode: 'history',
  routes: [
  	{ path: '/', 
  		beforeEnter: requireLogin,
  		component: Posts 		
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
    	path: '/posts/edit', 
    	component: EditPost, 
    	name: 'posts.edit',
      props: true 
    },
    { 
    	path: '/posts/create', 
    	component: NewPost, 
    	name: 'posts.create',
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

}

export default router;