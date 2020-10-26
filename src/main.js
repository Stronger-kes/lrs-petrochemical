import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/reset.css";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if(to.path != "/") {
    if(!token) {
      next({
        path: '/'
      })
    }else {
      next();
    }
  }else {
    next();
  }
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
