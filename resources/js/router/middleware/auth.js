export default function auth ({ next, store }){
	console.log('auth.js',store.getters.isAuthenticated);	
	if(!store.getters.isAuthenticated){
		return next({
		    name: 'login'
		})
	}
	return next()
}