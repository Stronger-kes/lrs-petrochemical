import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import("../views/login");
const Home = () => import("../views/home/Home");
const sysDict = () => import("../views/systemManagement/listUI");
const User = () => import("../views/systemManagement/user");
const Menu = () => import("../views/systemManagement/menuManagement");
const shopGoods = () => import("../views/shopGoods");
const Reduced = () => import("../views/reduced");
const Role = () => import("../views/systemManagement/role");

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
        meta: {title: '字典管理'}
      },
      {
        path: "/system/user",
        name: "user",
        component: User,
        meta: {title: '用户管理'}
      },
      {
        path: "/system/role",
        name: "Role",
        component: Role,
        meta: {title: "角色管理"}
      },
      {
        path: "/system/Menu",
        name: "Menu",
        component: Menu,
        meta: {title: '菜单管理'}
      },
      {
        path: "/manage/reduced",
        name: "reduced",
        component: Reduced
      },
      {
        path: "/shopGoods/listUI",
        name: "shopGoods",
        component: shopGoods,
        meta: {title: '商品管理'}
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
