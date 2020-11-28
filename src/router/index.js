import Vue from "vue";
import vueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Search from "../views/Search";
import Register from "../views/Register";

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
