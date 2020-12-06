import {
  reqCartList,
  reqUpdateCartCount,
  // reqUpdateCartCheck,
  //   reqDelCart,
} from "@api/shopCart";

export default {
  state: {
    cartList: [],
  },
  getters: {},
  actions: {
    async getCartList({ commit }) {
      const catrList = await reqCartList();
      commit("GET_CART_LIST", catrList);
    },
    async updateCartCount({ commit }, { skuId, skuNum }) {
      await reqUpdateCartCount(skuId, skuNum);
      commit("UPDATE_CART_COUNT", { skuId, skuNum });
    },
  },
  mutations: {
    GET_CART_LIST(state, catrList) {
      state.cartList = catrList;
    },
    UPDATE_CART_COUNT(state, { skuId, skuNum }) {
      state.cartList = state.cartList.map((cart) => {
        if (cart.skuId === skuId) {
          cart.skuNum += skuNum;
        }
        return cart;
      });
    },
  },
};
