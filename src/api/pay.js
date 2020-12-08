import request from "@utils/request";

/* 获取交易信息 */
export const reqTrade = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade",
  });
};

/* 提交订单请求，返回值是订单号 */
export const reqSubmitOrder = ({
  tradeNo, //订单编号
  consignee, //收件人姓名
  consigneeTel, //收件人电话
  deliveryAddress, //收件地址
  paymentWay, //支付方式
  orderComment, //订单备注
  orderDetailList, //商品
}) => {
  return request({
    method: "POST",
    url: "/order/auth/submitOrder",
    params: {
      tradeNo,
    },
    data: {
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList,
    },
  });
};

/* 请求支付二维码 */
export const reqQRcode = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`,
  });
};
