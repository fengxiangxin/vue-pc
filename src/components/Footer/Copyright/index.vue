<template>
  <div class="footer-info">
    <ul class="footer-help-list">
      <li>关于我们</li>
      <li>联系我们</li>
      <li>商家入驻</li>
      <li>营销中心</li>
      <li>友情链接</li>
      <li>联系我们</li>
      <li>商家入驻</li>
      <li>营销中心</li>
      <li>友情链接</li>
      <li class="clear">关于我们</li>
    </ul>
    <p>地址：北京市昌平区宏福科技园综合楼6层</p>
    <p>京ICP备19006430号</p>
  </div>
</template>

<script>
export default {
  name: "copyright",
};
</script>

<style lang="less" scoped>
.footer-info {
  text-align: center;
  width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}
.footer-help-list {
  display: flex;
  justify-content: center;
  li {
    border-right: 1px solid;
    padding: 0 10px;
  }
}
p {
  margin: 10px 0;
}
</style>
