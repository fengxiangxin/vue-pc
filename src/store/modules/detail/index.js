import { reqDeatail } from "@api/detail";

/**
 * 即便在mutations中是直接将一个对象赋值给state中的数据，但是state中的对象内的数据也必须要初始化
 */
export default {
  state: {
    productDetail: {
      categoryView: {}, // 分类数据
      skuInfo: {
        skuImageList: [],
      }, // 商品详情数据
      spuSaleAttrList: [], // 商品选择属性数据列表
    },
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
