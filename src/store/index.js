import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否加载中
    isLoading: false,
    // token(判断是否登录)
    token: null,
    // 是否在Home页面
    isHome: true
  },
  mutations: {
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    setToKen(state, value) {
      state.token = value;
    },
    setIsHome(state, value) {
      state.isHome = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
