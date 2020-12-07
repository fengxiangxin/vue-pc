<template>
  <div>
    <div class="login-bg">
      <div class="login-outer">
        <div class="login-form">
          <div class="login-way">
            <a class="deactive login-first-a">扫码登录</a>
            <a class="login-last-a">账户登录</a>
          </div>
          <div class="login-content">
            <form @submit.prevent="submit">
              <div class="login-input-outer">
                <label class="login-input">
                  <i>手机</i>
                  <input type="text" v-model="user.phone" />
                </label>
                <!-- <span>错误提示信息 </span> -->
              </div>
              <div class="login-input-outer">
                <label class="login-input">
                  <i>密码</i>
                  <input type="text" v-model="user.password" />
                </label>
                <!-- <span>错误提示信息 </span> -->
              </div>
              <div class="login-auto">
                <label>
                  <input type="checkbox" v-model="isAutoLogin" />
                  自动登录
                </label>
                <a href="###">忘记密码？</a>
              </div>
              <button class="login-btn" type="submit">登&nbsp;&nbsp;录</button>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <Copyright />
  </div>
</template>

<script>
import Copyright from "@components/Footer/Copyright";
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        phone: "",
        password: "",
      },
      isLoading: false,
      isAutoLogin: true,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      name: (state) => state.user.name,
    }),
  },
  methods: {
    async submit() {
      try {
        /* 如果此时正在登录，则阻止此次登录 */
        if (this.isLoading) return;

        /* 正在登录中 */
        this.isLoading = true;
        const { phone, password } = this.user;
        await this.$store.dispatch("login", { phone, password });
        /* 如果用户勾选自动登录 */
        if (this.isLoading) {
          /* 将token和name存储在localstorage */
          localStorage.setItem("token", this.token);
          localStorage.setItem("name", this.name);
        }
        /* 登录成功跳转到首页 */
        this.$router.replace("/");
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    // login() {
    //   reqLogin("13700000000", "111111")
    //     .then((res) => {
    //       console.log("res", res);
    //     })
    //     .catch((err) => {
    //       console.log("err", err);
    //     });
    // },
  },
  components: {
    Copyright,
  },
};
</script>

<style lang="less" scoped>
.login-bg {
  background-image: url("./images/loginbg.png");
  background-repeat: no-repeat;
  background-color: #e93854;
}
.login-outer {
  width: 1200px;
  height: 487px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 406px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
}
.login-way {
  a {
    display: inline-block;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #e1251b;
    border-top: 1px solid #28a3ef;
    box-sizing: border-box;
    width: 190px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
  }
  a:hover {
    text-decoration: none;
  }
  a.login-first-a {
    border-left: solid 1px #ddd;
  }
  a.login-last-a {
    border-right: solid 1px #ddd;
  }
  a.deactive {
    color: #333;
    border: 1px solid #ddd;
  }
}
.login-content {
  border: 1px solid #ddd;
  border-top: none;
  flex-grow: 1;
  padding: 18px;
  position: relative;
  form {
    margin: 15px 0 18px 0;
  }
  span {
    color: red;
    position: absolute;
    left: 60px;
  }
}
.login-input-outer {
  margin-bottom: 22px;
}
.login-input {
  display: flex;

  i {
    width: 37px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border: solid 1px #ccc;
    border-right: none;
    border-radius: 2px 0 0 2px;
  }
  input {
    flex-grow: 1;
    border: solid 1px #ccc;
    border-radius: 0 2px 2px 0;
    padding: 0 8px;
    outline: none;
    font-size: 14px;
  }
}
.login-auto {
  display: flex;
  justify-content: space-between;
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 64px;
  }
  a {
    color: #333;
  }
}
.login-btn {
  width: 100%;
  height: 36px;
  background-color: #e1251b;
  outline: none;
  border: none;
  margin-top: 25px;
  color: #fff;
  font-size: 16px;
}
</style>
