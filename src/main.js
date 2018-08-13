import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.directive('fileName', {
	inserted: (el, binding) => {
		let value = binding.value.slice(8)
		let index = value.lastIndexOf('/');
		index = index == -1 ? value.lastIndexOf('\\') : index 
		value = value.slice( index + 1 )
		el.innerText = value
	}
})
let permission = store.state.menus.permission || []
const initMenus = (to, next, fromLogin) => {
	if ( !sessionStorage.getItem('TOKEN') ) {
		next( { path: '/login' } );
	} else {
		if(!store.state.menus.menusHasFinished){
			store.dispatch('initMenus', ()=>{
				store.dispatch('getMenuAuth', to).then( next('/manage') )
				// fromLogin ? next('/manage') : next();
			} )
		}else{
			store.dispatch('getMenuAuth', to).then( fromLogin ? next('/manage') : next() )
		}
	}
}

router.beforeEach((to, from, next) => {
	
	if ( to.path == '/login' ) {
		if ( !sessionStorage.getItem('TOKEN') ) {
			next();
		} else {
			initMenus(to, next, true)
		}
	} else {
		if( permission.indexOf(to.path) == -1){
			next( { path: '/userInfo' } );
		}else{

			if ( !sessionStorage.getItem('TOKEN') ) {
				next( { path: '/login' } );
			} else {
				initMenus(to, next)
			}
		} 

	}
})



new Vue({
	el: '#app',
	router,
	store,
	// template: '<App/>',
	// components: { App }
	render: h => h(App)
})
