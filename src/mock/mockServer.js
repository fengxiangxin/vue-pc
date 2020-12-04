/* 引入mock，拦截ajax，生成响应数据 */
import Mock from "mockjs";

/* 引入banner模拟数据 */
import banners from "./banners";
/*  */
import floors from "./floors";

import likes from "./likes.json";
import recommend from "./recommend.json";

/* 这里的请求方式不能是大写 */
Mock.mock("/api/banners", "get", {
  code: 200,
  "data|4": banners,
});

Mock.mock("/api/floors", "get", {
  code: 200,
  "data|2": floors,
});

Mock.mock("/api/home/like", "get", {
  code: 200,
  "data|6": likes,
});

Mock.mock("/api/home/recommend", "get", {
  code: 200,
  "data|4": recommend,
});
