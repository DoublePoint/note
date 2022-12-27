import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import dict from './modules/dict'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import gitee from './modules/gitee'
import settings from './modules/settings'
import getters from './getters'
import menuState from './modules/menuState'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    dict,
    user,
    tagsView,
    permission,
    settings,
    gitee,
    menuState,
  },
  getters,
})

export default store
