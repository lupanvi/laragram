export default function auth ({ next, store }){	
	console.log('guest.js',store.getters.isAuthenticated);	
	if(store.getters.isAuthenticated){
		return next({
		    name: 'home'
		})
	}
	return next()
}