import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/reset.css";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
import iconPicker from 'e-icon-picker';
import "e-icon-picker/dist/symbol.js"; //基本彩色图标库
import 'e-icon-picker/dist/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库

Vue.use(iconPicker);//使用e-icon-picker
Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if(to.path != "/") {
    if(!token) {
      next({path: '/'})
    }else {
      next();
    }
  }else {
    next();
  }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
