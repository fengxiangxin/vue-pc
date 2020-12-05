import request from "@utils/request";

/* 请求商品详情 */
export const reqDeatail = (id) => {
  return request({
    method: "GET",
    url: `/item/${id}`,
  });
};
