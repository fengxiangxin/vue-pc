import { reqRegister } from "@api/user";

export default {
  state: {
    name: localStorage.getItem("userName") || "",
  },
  getters: {},
  actions: {
    async register({ commit }, { phone, password, code }) {
      await reqRegister(phone, password, code);
      commit;
    },
  },
  mutations: {},
};
