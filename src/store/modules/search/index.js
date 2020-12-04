import { reqProductList } from "@api/search";

export default {
  state: {
    productList: {
      /* 品牌数据 */
      trademarkList: [],
      /* 品牌属性数据 */
      attrsList: [],
      /* 商品数据 */
      goodsList: [],
    },
  },
  getters: {
    trademarkList(state) {
      return state.productList.trademarkList;
    },
    attrsList(state) {
      return state.productList.attrsList;
    },
    goodsList(state) {
      return state.productList.goodsList;
    },
    total(state) {
      return state.productList.todal;
    },
  },
  actions: {
    async getProductList({ commit }, data = {}) {
      const productList = await reqProductList(data);
      commit("GET_PRODUCT_LIST", productList);
    },
  },
  mutations: {
    GET_PRODUCT_LIST(state, productList) {
      state.productList = productList;
    },
  },
};
