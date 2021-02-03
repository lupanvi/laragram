export default function auth ({ next, store }){		
	if(store.getters.isAuthenticated){
		return next({
		    name: 'home'
		})
	}
	return next()
}