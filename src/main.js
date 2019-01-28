import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import {routes} from './routes'
import axios from 'axios'

import {store} from './store/store.js'



//配置默认路径
axios.defaults.baseURL = 'https://wd4291572084geexda.wilddogio.com/'
//配置Vue原型 (在任何组件中多可以使用axios)
Vue.prototype.$http = axios


Vue.use(VueRouter)


const router = new VueRouter({
	routes,
	mode:'history',
	//滚动行为
	// scrollBehavior(to,from,savedPosition){
	// 	// return {x:0,y:200};
	// 	// return { selector:'.btn'};

	// 	if(savedPosition){
	// 		return savedPosition
	// 	}else{
	// 		return {x:0,y:0}
	// 	}
	// }
})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
