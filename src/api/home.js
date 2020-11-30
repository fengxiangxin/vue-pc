import request from "@utils/request";
// import mockRequest from "@utils/mockRequest";

/* 请求主页导航数据接口 */
export const reqBaseCategoryList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};

/* 请求首页轮播图数据接口 */
export const reqHomeBanners = () => {
  return request({
    method: "GET",
    url: "/banners",
  });
};

/*  */
export const reqFloors = () => {
  return request({
    method: "GET",
    url: "/floors",
  });
};
