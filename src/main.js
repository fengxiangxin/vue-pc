import Vue from "vue";
/* 引入根组件 */
import App from "./App";
/* 引入路由配置 */
import router from "./router";
/* 引入vuex */
import store from "./store";
/* 引入mock模拟数据 */
import "./mock/mockServer";
/* 引入全局样式 */
import "./styles/reset.css";

import "./plugins/element.js";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  /* 应用路由 */
  router,
  /* 应用vuex */
  store,
}).$mount("#app");
