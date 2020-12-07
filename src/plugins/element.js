import Vue from "vue";
import { Button, Message, Pagination } from "element-ui";

Vue.use(Button);
Vue.use(Pagination);

/* 给this扩展一个$message用于提示信息 */
Vue.prototype.$message = Message;
