import Vue from "vue";
import vueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home";
import Login from "../views/Login";
import Search from "../views/Search";
import Register from "../views/Register";
import Detail from "../views/Detail";
import AddCartSuccess from "../views/AddCartSuccess";
import ShopCart from "../views/ShopCart";
import Trade from "../views/Trade";
import PaySuccess from "../views/PaySuccess";
import Pay from "../views/Pay";
import Center from "../views/Center";

import VueRouter from "vue-router";

/**
 * 在Vue中编程式导航会返回一个promise对象
 * 当重复点击编程式导航时，则会返回一个失败的promise对象
 * 如果不处理这个失败的promise对象，则会报错
 * 在这里重写push和replace方法，默认自动处理失败的promise
 */
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  /* this指向push方法的调用者，使用call修正this */
  /* 如果没有传入失败promise的处理函数，则默认以空函数处理失败的promise */
  return push.call(this, location, onComplete, onAbort || (() => {}));
};
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  return replace.call(this, location, onComplete, onAbort || (() => {}));
};

/* 安装路由插件 */
Vue.use(vueRouter);

const router = new vueRouter({
  routes: [
    {
      /* 主页路由 */
      path: "/",
      component: Home,
    },
    {
      /* 登陆页面路由 */
      path: "/login",
      component: Login,
      /* meta参数会传递到$route中，使用meta参数控制Footer组件是否显示 */
      meta: {
        isHideFooter: true,
      },
    },
    {
      /* 注册页面路由 */
      path: "/register",
      component: Register,
      meta: {
        isHideFooter: true,
      },
    },
    {
      /* 搜索页面路由 */
      name: "search",
      path: "/search/:searchText?",
      component: Search,
    },
    {
      /* 详情页面路由 */
      name: "detail",
      path: "/detail/:id",
      component: Detail,
    },
    {
      /* 添加购物车成功 */
      name: "addcartsuccess",
      path: "/addcartsuccess",
      component: AddCartSuccess,
    },
    {
      /* 购物车 */
      name: "shopcart",
      path: "/shopcart",
      component: ShopCart,
    },
    {
      /* 交易信息 */
      name: "trade",
      path: "/trade",
      component: Trade,
    },
    {
      /* 支付 */
      name: "pay",
      path: "/pay",
      component: Pay,
    },
    {
      /* 支付成功 */
      name: "paysuccess",
      path: "/paysuccess",
      component: PaySuccess,
    },
    {
      /* 订单 */
      name: "center",
      path: "/center/myorder",
      component: Center,
    },
  ],
  /* 路由切换时设置滚动条的位置为最顶部 */
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
/* 路由全局前置守卫，设置未登录用户不能访问的页面 */
const permissionPaths = ["trade", "pay", "center"];
router.beforeEach((to, from, next) => {
  /**
   * to：目标路由
   * from：当前路由
   * next：只会执行一次的函数，控制跳转到哪个路由
   */
  /* 如果目标路由未登录用户无权访问 */
  if (permissionPaths.indexOf(to.path) > -1 && store.state.user.token) {
    /* 强制跳转到登录页面 */
    return next("/login");
  }
  /* 否则正常跳转 */
  next();
});

export default router;
