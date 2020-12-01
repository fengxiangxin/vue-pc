/* 引入mock，拦截ajax，生成响应数据 */
import Mock from "mockjs";

/* 引入banner模拟数据 */
import banners from "./banners";
/*  */
import floors from "./floors";

/* 这里的请求方式不能是大写 */
Mock.mock("/api/banners", "get", {
  code: 200,
  "data|4": banners,
});

Mock.mock("/api/floors", "get", {
  code: 200,
  "data|2": floors,
});
