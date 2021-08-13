import Vue from 'vue'
import Vuex from 'vuex'
import CityModule from './modules/CityModule'
import CinemaModule from './modules/CinemaModule'
import TabbarModule from './modules/TabbarModule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    // 公共状态
  },
  // 集中式修改状态-被监控 Devtools
  mutations: {

  },

  actions: {
    // 异步
  },
  modules: {
    // 各个模块
    CinemaModule,
    CityModule,
    TabbarModule
  }
})
// store 只是存在内存中

// store 某些配置需要持久化
