// vuex
// 注意博主将其模块化
// menuState.js

export default {
  state: {
    showRightMenu: false,
    showCreateDirDialog: false,
    mouseTopNumber: 0,
    mouseLeftNumber: 0,
    giteeTree: {},
    menuMeta: {},
    currentOpenMenu: {},
  },
  mutations: {
    changeShowRightMenu(state, val) {
      state.showRightMenu = val
    },
    changeMouseTopNumber(state, val) {
      state.mouseTopNumber = val
    },
    changeMouseLeftNumber(state, val) {
      state.mouseLeftNumber = val
    },
    changeMenuMeta(state, val) {
      state.menuMeta = val
    },
    changeShowCreateDirDialog(state, val) {
      state.showCreateDirDialog = val
    },
    changeGiteeTree(state, val) {
      state.giteeTree = val
    },
    setCurrentOpenMenu(state, val) {
      state.currentOpenMenu = val
    },
  },
}
