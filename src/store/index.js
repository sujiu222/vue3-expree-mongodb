//import { create } from 'core-js/core/object';
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    changeCollapse(state) {//控制侧边栏
      state.isCollapsed = !state.isCollapsed;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["isCollapsed"],
  })],//使用插件
})
