<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <ValidationProvider rules="required|length|phone" v-slot="{ errors }"
          ><!-- 验证规则 -->
          <input
            type="text"
            placeholder="请输入你的手机号"
            v-model="user.phone"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="user.code"
          required
        />
        <img
          ref="code"
          src="http://182.92.128.115/api/user/passport/code"
          alt="code"
          @click="refreshCode"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="user.password"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="user.r_password"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="user.isAgree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <Copyright />
  </div>
</template>

<script>
import Copyright from "@components/Footer/Copyright";
/**
 * 使用vee-validate实现表单验证功能
 * extend用于自定义规则
 * required是默认规则
 * 使用ValidationProvider包裹住需要验证的表单项，并在属性中说明要使用的规则
 * 需要验证的表单项必须双向数据绑定
 */
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
/* 手机号必填规则 */
extend("required", {
  ...required,
  message: "手机号为必填项", // 用于提示错误信息
});
/* 手机号长度规则 */
extend("length", {
  validate(value) {
    return value.length === 11;
  },
  message: "手机号必须为11位",
});
/* 手机号正则验证规则 */
extend("phone", {
  validate(value) {
    return /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(
      value
    );
  },
  message: "手机号不规范",
});

export default {
  name: "Register",
  data() {
    return {
      user: {
        phone: "",
        code: "",
        password: "",
        r_password: "",
        isAgree: false,
      },
    };
  },
  methods: {
    /* 刷新验证码，只需点击图片时重新设置图片的请求地址 */
    refreshCode() {
      this.$refs.code.src = "http://182.92.128.115/api/user/passport/code";
    },
    /* 注册,收集数据，正则验证 */
    async register() {
      try {
        const { phone, code, password, r_password, isAgree } = this.user;
        if (!isAgree) {
          this.$message.error("请同意用户协议");
          return;
        }
        if (password !== r_password) {
          this.$message.error("两次密码不一致");
          return;
        }
        if (!code) {
          this.$message.error("请输入验证码");
          return;
        }
        /* 发送注册请求 */
        await this.$store.dispatch("register", { phone, code, password });
        /* 注册成功跳转到登录页面 */
        this.$router.replace("/login");
      } catch (error) {
        console.log(error);
        /* 如果注册失败就清空密码和刷新验证码 */
        this.user.password = "";
        this.user.r_password = "";
        this.code = "";
        this.refreshCode();
      }
    },
  },
  components: {
    Copyright,
    ValidationProvider,
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  // .copyright {
  //   width: 1200px;
  //   margin: 0 auto;
  //   text-align: center;
  //   line-height: 24px;

  //   ul {
  //     li {
  //       display: inline-block;
  //       border-right: 1px solid #e4e4e4;
  //       padding: 0 20px;
  //       margin: 15px 0;
  //     }
  //   }
  // }
}
</style>