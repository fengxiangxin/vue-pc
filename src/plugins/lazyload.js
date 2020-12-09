import Vue from "vue";
import VueLazyload from "vue-lazyload";

/* js中引入的图片资源路径无法被解析，只能手动引入图片资源 */
import loading from "../assets/images/loading.gif";

Vue.use(VueLazyload, {
  loading: loading,
});
