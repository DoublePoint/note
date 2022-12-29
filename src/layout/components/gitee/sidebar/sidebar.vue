<template>
  <div :class="{ 'has-logo': showLogo }" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div style="text-align: center; margin-top: 25px" v-if="showCreateNewBtn">
      <el-row>
        <el-button type="primary" @click="handleCreateWS">创建一个工作空间</el-button>
      </el-row>
    </div>
    <el-scrollbar v-if="hasNoterRepository" :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
      <div class="sidebar-title-parent">
        <h1 class="sidebar-title" style="color: rgb(255, 255, 255); line-height: 30px">私有的</h1>
        <el-button type="primary" class="sidebar-btn" icon="el-icon-plus" circle @click="createNew"></el-button>
      </div>

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        :active-text-color="settings.theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="(route, index) in notedirs" :key="route.path + index" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <transition name="fade">
      <div v-if="menuState.showRightMenu" class="right-menu border-radius-little box-shadow" :style="{ top: menuState.mouseTopNumber + 'px', left: menuState.mouseLeftNumber + 'px' }">
        <context-menu :meta="menuState.menuMeta"></context-menu>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'
import ContextMenu from '@/components/ContextMenu/ContextMenu.vue'
import { getDirectories, createNewRepository, requestGiterInfo, getAllRepos } from '@/api/gitee/gitee.js'
import dirParse from '@/api/tool/dirparse.js'
import cacheUtil from '@/plugins/cache.js'
import defaultPlugin from '@/plugins/defaultplugin.js'
import gitplugin from '@/plugins/gitplugin.js'
import Constant from '@/utils/const.js'

export default {
  components: { SidebarItem, Logo, ContextMenu },
  computed: {
    ...mapState(['settings', 'menuState']),
    ...mapGetters(['sidebarRouters', 'sidebar', 'notedirs']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  data() {
    return {
      visible: null,
      topNumber: 0,
      leftNumber: 0,
      hasNoterRepository: false,
      showCreateNewBtn: false,
    }
  },
  watch: {
    hasNoterRepository(newVal) {
      if (newVal) {
        this.refreshGiteeDirectory()
      }
    },
  },
  methods: {
    save() {},
    createNew() {
      this.$store.commit('changeShowCreateDirDialog', true)
    },
    initRepository() {
      requestGiterInfo()
        .then((res) => {
          return getAllRepos()
        })
        .then((res) => {
          const repoArr = res
          debugger
          const repo = repoArr.find((item) => item.name == defaultPlugin.getDefaultRepositoryName())
          if (repo == undefined) {
            this.hasNoterRepository = false
            this.showCreateNewBtn = true
          } else {
            this.hasNoterRepository = true
            this.showCreateNewBtn = false
          }
          // console.log(res);
        })
        .catch((e) => {
          this.hasNoterRepository = false
          this.showCreateNewBtn = true
          console.log(e)
        })
    },
    handleCreateWS() {
      let repoName = defaultPlugin.getDefaultRepositoryName()
      createNewRepository(repoName)
        .then((res) => {
          return gitplugin.createReadmeFile()
        })
        .then((res) => {
          this.$modal.msgSuccess('新增成功')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
    },
    refreshGiteeDirectory() {
      getDirectories().then((res) => {
        cacheUtil.local.setJSON(Constant.GITEE_DIRECTORY_TREE, res.tree)
        let data = dirParse(res.tree)
        this.$store.commit('SET_NOTEDIRS', data)
      })
    },
  },

  mounted() {
    this.initRepository()
  },
}
</script>

<style lang="scss" scoped>
.el-menu {
  width: 100%;
  border-right: none;
  text-align: start;
  text-justify: middle;
}

.right-menu {
  width: 210px;
  position: fixed;
  padding: 10px;
  background-color: rgb(60, 70, 90);
  color: rgba(255, 255, 255, 0.81);
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 20%) 0px 3px 6px, rgb(15 15 15 / 40%) 0px 9px 24px;
}
.sidebar-title-parent {
  height: 100%;
  vertical-align: middle;
  .sidebar-title {
    padding-left: 10px;
    display: inline-block;
    margin: 0;
    color: #fff;
    font-weight: 600;
    line-height: px;
    height: 30px;
    font-size: 14px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
  .sidebar-btn {
    font-size: 8px;
    float: right;
    margin-top: 4px;
    margin-right: 10px;
    vertical-align: middle;
    display: inline-block;
  }
}

i {
  font-size: 25px;
}
.el-button--medium.is-circle {
  padding: 4px;
  vertical-align: middle;
  display: inline-block;
}
</style>
