import { reqDeatail } from "@api/detail";

export default {
  state: {
    productDetail: {},
  },
  getters: {
    categoryView(state) {
      return state.productDetail.categoryView;
    },
    spuSaleAttrList(state) {
      return state.productDetail.spuSaleAttrList;
    },
    skuInfo(state) {
      return state.productDetail.skuInfo;
    },
    price(state) {
      return state.productDetail.price;
    },
  },
  actions: {
    async getProductDetail({ commit }, id) {
      const productDetail = await reqDeatail(id);
      commit("GET_PRODUCT_DETAIL", productDetail);
    },
  },
  mutations: {
    GET_PRODUCT_DETAIL(state, productDetail) {
      state.productDetail = productDetail;
    },
  },
};
