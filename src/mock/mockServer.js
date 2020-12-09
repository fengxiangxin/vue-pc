/* 引入mock，拦截ajax，生成响应数据 */
import Mock from "mockjs";

/* 引入banner模拟数据 */
import banners from "./banners";
/*  */
import floors from "./floors";

import likes from "./likes.json";
import recommend from "./recommend.json";

const prefix_url =
  process.env.NODE_ENV === "development" ? "/" : "http://182.92.128.115/";

/* 这里的请求方式不能是大写 */
Mock.mock(`${prefix_url}api/banners`, "get", {
  code: 200,
  "data|4": banners,
});

Mock.mock(`${prefix_url}api/floors`, "get", {
  code: 200,
  "data|2": floors,
});

Mock.mock(`${prefix_url}api/home/like`, "get", {
  code: 200,
  "data|6": likes,
});

Mock.mock(`${prefix_url}api/home/recommend`, "get", {
  code: 200,
  "data|4": recommend,
});
