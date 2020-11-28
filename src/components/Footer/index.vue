<template>
  <div class="footer-outer">
    <div class="footer-list">
      <dl v-for="dl in staticData" :key="dl.index" class="footer-list-dl">
        <dt v-text="dl.dt" class="footer-list-dt"></dt>
        <dd v-for="dd in dl.dd" :key="dd" v-html="dd" class="footer-list-dd"></dd>
      </dl>
      <dl>
        <dt class="footer-list-dt">帮助中心</dt>
        <dd class="footer-img"><img src="./images/wx_cz.jpg" alt="" /></dd>
      </dl>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      staticData: [
        {
          dt: "购物指南",
          dd: ["购物流程", "会员介绍", "生活旅行/团购", "常见问题", "购物指南"],
        },
        {
          dt: "配送方式",
          dd: [
            "上门自提",
            "211限时达",
            "配送服务查询",
            "配送费收取标准",
            "海外配送",
          ],
        },
        {
          dt: "支付方式",
          dd: ["货到付款", "在线支付", "分期付款", "邮局汇款", "公司转账"],
        },
        {
          dt: "售后服务",
          dd: ["售后政策", "价格保护", "退款说明", "返修/退换货", "取消订单"],
        },
        {
          dt: "特色服务",
          dd: ["夺宝岛", "DIY装机", "延保服务", "尚品汇E卡", "尚品汇通信"],
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.footer-outer {
  background-color: #eaeaea;
}
.footer-list {
  display: flex;
  justify-content: space-around;
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
.footer-list-dt {
  color: #333;
  font-size: 14px;
  font-weight: bolder;
  height: 18px;
  width: 190px;
}
.footer-list-dd{
  height: 18px;
}

</style>
