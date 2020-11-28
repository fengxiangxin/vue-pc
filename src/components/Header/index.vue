<template>
  <div>
    <div class="header-top-outer">
      <div class="header-top">
        <div class="header-login-register">
          <h1 class="header-welcome">尚品汇欢迎您！请</h1>
          <router-link to="/login" class="header-login">登录 </router-link>
          <router-link to="/register" class="header-register"
            >免费注册</router-link
          >
        </div>
        <div class="header-type-list">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###" class="header-clear">商家后台</a>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="header-logo">
        <router-link to="/"
          ><img src="./images/logo.png" alt="Logo"
        /></router-link>
      </div>
      <div class="header-form">
        <form action="" @submit.prevent="search">
          <input type="text" class="header-search" v-model="searchText" />
          <button
            class="header-search-button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      /* 搜索内容 */
      searchText: "",
    };
  },
  methods: {
    search() {
      /* 根据搜索内容跳转到指定路由并传递params参数 */
      this.$router.push("/search" + (this.searchText && `/${this.searchText}`));
    },
  },
};
</script>

<style lang="less" scoped>
.header-top-outer {
  background-color: #eaeaea;
}
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  height: 30px;
}
.header-welcome {
  font-size: 12px;
  font-weight: normal;
  color: #333;
  margin-right: 5px;
}
.header-bottom {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
}
.header-login-register {
  display: flex;
}
.header-login {
  border-right: 1px solid #b3aeae;
  padding-right: 5px;
}
.header-register {
  padding-left: 5px;
}
.header-type-list {
  a {
    padding: 0 10px;
    border-right: 1px solid #b3aeae;
  }
  .header-clear {
    border: none;
  }
}
.header-logo {
  display: flex;
  width: 265px;
  height: 106px;
  justify-content: center;
  align-items: center;
  a {
    font-size: 0;
  }
  img {
    width: 175px;
    height: 56px;
  }
}
.header-form {
  display: flex;
  align-items: center;
}
.header-search {
  outline: none;
  width: 490px;
  height: 32px;
  border: 2px solid #ea4a36;
  box-sizing: border-box;
  padding: 0 5px;
}
.header-search-button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
