import Vue from "vue";
import Vuex from "vuex";

/* 模块化不同组件的数据 */
import modules from "./modules";

/* 使用Vuex插件 */
Vue.use(Vuex);

/* 公共的数据 */
const state = {};
const getters = {};
const actions = {};
const mutations = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});
