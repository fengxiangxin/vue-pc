import request from "@utils/request";

/* 获取购物车数据 */
export const reqCartList = () => {
  return request({
    method: "GET",
    url: "/cart/cartList",
  });
};

/* 添加和删除购物车 */
export const reqUpdateCartCount = (skuId, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};

/* 切换商品是否被勾选 */
export const reqUpdateCartCheck = (skuId, checked) => {
  return request({
    method: "GET",
    url: `/cart/addToCart/${skuId}/${checked}`,
  });
};

/* 删除商品 */
export const reqDelCart = (skuId) => {
  return request({
    method: "DELETE",
    url: `/cart/deleteCart/${skuId}`,
  });
};
