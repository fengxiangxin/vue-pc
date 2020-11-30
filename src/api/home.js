import request from "@utils/request";

/* 请求主页导航数据接口 */
export const reqBaseCategoryList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};
