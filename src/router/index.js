import Vue from "vue";
import vueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Search from "../views/Search";
import Register from "../views/Register";
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

export default new vueRouter({
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
      path: "/search/:searchText?",
      component: Search,
    },
  ],
});
