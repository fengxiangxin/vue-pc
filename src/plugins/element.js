import Vue from "vue";
import { Button, Message, Pagination, MessageBox } from "element-ui";

Vue.use(Button);
Vue.use(Pagination);

/* 给this扩展一个$message用于提示信息 */
Vue.prototype.$message = Message;

Vue.prototype.$alert = MessageBox.alert;
