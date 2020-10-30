import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import("../views/login");
const Home = () => import("../views/home/Home");
const User = () => import("../views/systemManagement/user");
const Role = () => import("../views/systemManagement/role");
const sysDict = () => import("../views/systemManagement/listUI");
const Menu = () => import("../views/systemManagement/menuManagement/index.vue");
const Department = () => import("../views/systemManagement/department/index.vue");
const shopGoods = () => import("../views/shopGoods");
const Reduced = () => import("../views/reduced");
const Online = () => import("../views/systemMonitoring/online");
const Log = () => import("../views/systemMonitoring/log");
const Loginlog = () => import("../views/systemMonitoring/loginlog");
const Httptrace = () => import("../views/systemMonitoring/httptrace");
const Swagger = () => import("../views/systemMonitoring/swagger");
const DispatcherLog = () => import("../views/askScheduling/dispatcherLog");
const TimedTask = () => import("../views/askScheduling/timed");
const Configure = () => import("../views/codeGeneration/configure")
const Generation = () => import("../views/codeGeneration/generation");
const Eximport = () => import("../views/otherModules/Eximport");
const addDiscount = () =>import('../views/shopGoods/addDiscount.vue');
const DiscountCoupon = () =>import('../views/reduced/DiscountCoupon.vue');
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
    children: [
      {
        path: "/sysDict/listUI",
        name: "listUI",
        component: sysDict,
        meta: { title: '字典管理' }
      },
      {
        path: "/system/user",
        name: "user",
        component: User,
        meta: { title: '用户管理' }
      },
      {
        path: "/system/role",
        name: "Role",
        component: Role,
        meta: { title: "角色管理" }
      },
      {
        path: "/system/Menu",
        name: "Menu",
        component: Menu,
        meta: { title: '菜单管理' }
      },
      {
        path: "/system/dept",
        name: "Department",
        component: Department,
        meta: { title: "部门管理" }
      },
      {
        path: "/manage/reduced",
        name: "reduced",
        component: Reduced,
        meta: {title: "优惠券管理"}
      },
      {
        path: "/manage/countCoupon",
        name: "DiscountCoupon",
        component: DiscountCoupon,
        meta: {title: "添加优惠券"}
      },
      {
        path: "/shopGoods/listUI",
        name: "shopGoods",
        component: shopGoods,
        meta: { title: '商品管理' }
      },
      {
        path: "/shopGoods/addcount",
        name: "addDiscount",
        component: addDiscount,
        meta: { title: '添加商品'}
      },
      {
        path: "/monitor/online",
        name: "/Online",
        component: Online,
        meta: { title: "在线用户" }
      },
      {
        path: "/monitor/log",
        name: "Log",
        component: Log
      },
      {
        path: "/monitor/loginlog",
        name: "Loginlog",
        component: Loginlog,
        meta: { title: "登陆日志" }
      },
      {
        path: "/monitor/httptrace",
        name: "Httptrace",
        component: Httptrace,
        meta: { title: "请求追求" }
      },

      {
        path: "/monitor/swagger",
        name: "Swagger",
        component: Swagger,
        methods: { title: "Swagger文档" }
      },
      {
        path: "/job/job",
        name: "TimedTask",
        component: TimedTask,
        meta: { title: "定时任务" }
      },
      {
        path: "/job/log",
        name: "/job/log",
        component: DispatcherLog,
        meta: { title: "调度日志" }
      },
      {
        path: "/generator/configure",
        name: "Configure",
        component: Configure,
        meta: { title: "生成配置" }
      },
      {
        path: "/generator/generator",
        name: "Generation",
        component: Generation,
        meta: { title: "代码生成" }
      },
      {
        path: "/others/eximport",
        name: "Eximport",
        component: Eximport,
        meta: { title: "其他模块" }
      }
      
    ]
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  }
]


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)

}

const router = new VueRouter({
  routes
})

export default router
