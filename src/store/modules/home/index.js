import { reqBaseCategoryList } from "@api/home";

/* 导出home组件数据 */
export default {
  state: {
    categoryList: [],
  },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      const categoryList = await reqBaseCategoryList();
      commit("GET_CATEGORY_LIST", categoryList.slice(0, 15));
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
  },
};
