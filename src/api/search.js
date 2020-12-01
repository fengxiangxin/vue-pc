import request from "@utils/request";

/*  请求产品列表 */
export const reqProductList = (data) => {
  return request({
    method: "POST",
    url: "/list",
    data,
  });
};
