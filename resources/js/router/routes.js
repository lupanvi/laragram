import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PostsEdit from '../pages/Posts/PostsEdit';
import PostsNew from '../pages/Posts/PostsNew';
import CommentsList from '../pages/Comments';
import guest from './middleware/guest';
import auth from './middleware/auth';

export default [  	
    {
      path: "/",
      name: "home",
      component: Home,
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
      component: PostsNew, 
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
    },      	   
    { 
    	path: '/login',       
    	component: Login, 
    	name:'login',            
      meta: {
              middleware: [ guest ]
            }
    },
    { 
    	path: '/register',       
    	component: Register, 
    	name: 'register',      
      meta: {
              middleware: [ guest ]
            }
    }
  ]