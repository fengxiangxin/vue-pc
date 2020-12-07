import { reqRegister, reqLogin } from "@api/user";

export default {
  state: {
    name: localStorage.getItem("userName") || "",
    token: localStorage.getItem("token") || "",
  },
  getters: {},
  actions: {
    /* actions函数只能接收两个参数第一个参数必定commit，如果要接收外面的多个参数，则必须使用对象形式 */
    async register({ commit }, { phone, password, code }) {
      await reqRegister({ phone, password, code });
      commit;
    },

    async login({ commit }, { phone, password }) {
      const user = await reqLogin(phone, password);
      commit("LOGIN", user);
    },
  },
  mutations: {
    LOGIN(state, user) {
      state.name = user.name;
      state.token = user.token;
      console.log(user);
    },
  },
};
