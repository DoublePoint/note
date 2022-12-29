import Cookies from 'js-cookie'
import Constant from '@/utils/const.js'
import cachePlugin from '@/plugins/cacheplugin.js'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    hide: false,
    width: cachePlugin.getSidebarInfo() == null ? Constant.SIDEBAR_DEFAULT_WIDTH : cachePlugin.getSidebarInfo().width,
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    if (state.sidebar.hide) {
      return false
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_SIDEBAR_HIDE: (state, status) => {
    state.sidebar.hide = status
  },
  SET_SIDEBAR_WIDTH: (state, width) => {
    state.sidebar.width = width
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  toggleSideBarHide({ commit }, status) {
    commit('SET_SIDEBAR_HIDE', status)
  },
  setSidebarWidth({ commit }, width) {
    commit('SET_SIDEBAR_WIDTH', width)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
