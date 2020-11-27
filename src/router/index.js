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
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/search",
      component: Search,
    },
  ],
});
