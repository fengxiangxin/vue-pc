import request from "@utils/request";

/* 获取购物车数据 */
export const reqCartList = () => {
  return request({
    method: "GET",
    url: "/car/cartList",
  });
};
