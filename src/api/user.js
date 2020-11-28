import request from "@utils/request";

/* 登录请求接口 */
export const reqLogin = (phone, password) => {
  return request({
    method: "POST",
    url: "/user/passport/login",
    /* 请求体参数 */
    data: {
      phone,
      password,
    },
  });
};
