/* axios拦截器 */
import axios from "axios";
/* 引入进度条 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
/* 引入elementUI用于提示错误信息 */
import { Message } from "element-ui";

/* instance功能与axios类似，但是不完全相同 */
const instance = axios.create({
  baseURL: "/api",
  headers: {},
});

/* 设置请求拦截器 */
instance.interceptors.request.use(
  (config) => {
    /* 开始进度条 */
    NProgress.start();
    /**
     * config是请求的配置对象
     * 包含请求方式，请求地址，请求参数等
     */
    return config;
  }
  /* 这里有一个处理失败的回调函数，但是这个回调函数必定不会触发，所以不写 */
);

/* 设置响应拦截器 */
instance.interceptors.response.use(
  /* 响应成功的http状态码为2xx */
  (response) => {
    /* 结束进度条 */
    NProgress.done();
    /**
     * 根据返回的数据中的code值判断是否请求到正确的数据
     * 只有当code===200时才说明请求到正确的数据
     */
    if (response.data.code === 200) {
      /* 将数据作为promise的结果值返回 */
      return response.data.data;
    }
    // console.log(response.data);
    /* code!==200说明出现错误，没有请求到数据，返回失败的promise */
    /* 提示错误信息 */
    Message.error(response.data.message);
    return Promise.reject(response.data.message);
  },
  /* 响应失败 */
  (error) => {
    /* 结束进度条 */
    NProgress.done();
    /* 提示错误信息 */
    Message.error(error.message);
    /* 返回失败的promise，值为错误信息 */
    return Promise.reject(error.message);
  }
);

export default instance;
