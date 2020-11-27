import Vue from "vue";
import vueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";

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
  ],
});
