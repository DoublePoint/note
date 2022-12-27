<template>
  <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg"
      @click="handleClickOutside" /> -->

    <!-- 菜单栏 -->
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />

    <div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <!-- 主窗口 -->
      <app-main />
      <right-panel>
        <settings />
      </right-panel>
    </div>

    <!-- 创建文件夹弹窗 -->
    <el-dialog title="创建文件夹" :visible.sync="menuState.showCreateDirDialog">
      <el-form :model="form">
        <el-form-item label="文件夹名称" :label-width="formLabelWidth">
          <el-input v-model="form.fileName" autocomplete="off">
            <template slot="prepend">{{ preDir }}</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuState.showCreateDirDialog = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Settings, TagsView } from '../components/gitee'
import Navbar from '../components/gitee/navbar/index.vue'
import Sidebar from '../components/gitee/sidebar/sidebar.vue'
import ResizeMixin from '../mixin/ResizeHandler'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'
import { createGitDirectory, getDirectories } from '@/api/gitee/gitee.js'
import Constant from '@/utils/const.js'
import cacheUtil from '@/plugins/cache.js'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
  },
  created() {},
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: true,
      form: {
        fileName: '',
      },
    }
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: (state) => state.settings.theme,
      sideTheme: (state) => state.settings.sideTheme,
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    ...mapState(['menuState']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
    variables() {
      return variables
    },
    preDir() {
      return (this.menuState.menuMeta.gitpath == undefined ? '' : this.menuState.menuMeta.gitpath) + '/'
    },
  },
  methods: {
    handleClickOutside() {},
    save() {
      let fileName = this.form.fileName
      createGitDirectory(this.preDir + fileName).then(() => {
        this.$modal.msgSuccess(`创建成功`)
        this.$store.commit('changeShowCreateDirDialog', false)
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
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  // z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
