//import { create } from 'core-js/core/object';
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {},
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    changeCollapse(state) {//控制侧边栏
      state.isCollapsed = !state.isCollapsed;
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["isCollapsed", 'userInfo'],
  })],//使用插件,可以让存储变成持久化，以便后续刷新也能做到保持不变
})
