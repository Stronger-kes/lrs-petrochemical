import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import("../views/login");
const Home = () => import("../views/home/Home");
const sysDict = () => import("../views/listUI");
const User = () => import("../views/user");

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    component: Home,
    meta: {
      title: "系统首页",
      Authorition: true
    },
    redirect: "",
    children: [
      {
        path: "/sysDict/listUI",
        name: "listUI",
        component: sysDict,
      },
      {
        path: "/system/user",
        name: "user",
        component: User,
      }
    ]
  },
  {
    path:"/",
    name: "Login",
    component: Login,
  }
]

const router = new VueRouter({
  routes
})

export default router
