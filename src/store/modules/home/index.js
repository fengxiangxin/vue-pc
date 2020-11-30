import { reqBaseCategoryList, reqHomeBanners, reqFloors } from "@api/home";

/* 导出home组件数据 */
export default {
  state: {
    categoryList: [],
    banners: [],
    floors: [],
  },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      const categoryList = await reqBaseCategoryList();
      commit("GET_CATEGORY_LIST", categoryList.slice(0, 15));
    },
    async getHomeBanners({ commit }) {
      const banners = await reqHomeBanners();
      commit("GET_HOME_BANNERS", banners);
    },
    async getHomeFloors({ commit }) {
      const floors = await reqFloors();
      commit("GET_HOME_FLOORS", floors);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    GET_HOME_BANNERS(state, banners) {
      state.banners = banners;
    },
    GET_HOME_FLOORS(state, floors) {
      state.floors = floors;
    },
  },
};
