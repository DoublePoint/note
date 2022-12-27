<!-- 菜单组件 RightMenuComponent.vue -->

<template>
  <div style="width: 100%" class="border-radius-little">
    <div style="width: 100%" v-for="(item, index) in rightMenuList" :key="item.name">
      <context-menu-item
        :class="index == rightMenuList.length - 1 ? 'border-radius-bottom-little' : index == 0 ? 'border-radius-top-little bd-bottom' : 'bd-bottom'"
        :icon="item.icon"
        @selected="handleSelected(item.id)"
        :name="item.name"
      ></context-menu-item>
    </div>
  </div>
</template>

<script>
import ContextMenuItem from './ContextMenuItem.vue'
import { mapState } from 'vuex'
import { getToken } from '@/utils/auth.js'
import Const from '@/utils/const.js'
import cacheUtil from '@/plugins/cache.js'
import dirParse from '@/api/tool/dirparse.js'
import { deleteDirectories, getDirectories } from '@/api/gitee/gitee.js'
import Constant from '@/utils/const.js'

export default {
  name: 'ContextMenuComponent',
  props: ['meta'],
  ...mapState(['menuState']),
  data() {
    return {
      rightMenuList: [
        {
          icon: 'el-icon-document',
          name: '创建文件',
          id: '01',
        },
        // {
        //   icon: 'el-icon-refresh-right',
        //   name: '创建文件',
        //   id: '02',
        // },
        {
          icon: 'el-icon-delete',
          name: '删除',
          id: '03',
        },
      ],
    }
  },
  components: {
    ContextMenuItem,
  },
  methods: {
    handleSelected(id) {
      //新增文件
      if (id == '01') {
        this.$store.commit('changeShowCreateDirDialog', true)
      }
      //新增文件
      else if (id == '02') {
      }
      //删除文件
      else if (id == '03') {
        this.$modal.confirm('确认删除吗？').then(() => {
          this.deleteDirectories()
        })
      }
    },
    deleteDirectories() {
      let access_token = getToken()
      const userInfo = cacheUtil.local.getJSON(Const.LOCAL_STORAGE_USER_INFO_KEY)
      let repo = Const.BASE_REPOSITORY_NAME
      let owner = userInfo.name
      let path = this.meta.gitpath

      if (this.meta.children.length > 0) {
        this.$message.error('请先删除文件夹下的文件.')
        return
      }

      //获取gitee中的元数据信息
      let giteeDirTree = cacheUtil.local.getJSON(Constant.GITEE_DIRECTORY_TREE)
      let selectedGitMeta = giteeDirTree.find((val) => val.path === path.substring(1, path.length))
      // debugger
      if (selectedGitMeta == null) {
        this.$message.error('未找到元数据信息，删除失败.')
        return
      }
      let sha = selectedGitMeta.sha
      let message = 'Delete'
      const info = {
        access_token,
        repo,
        owner,
        path,
        sha,
        message,
      }
      deleteDirectories(info).then((res) => {
        this.$message.success('删除成功')
        return this.refreshGiteeDirectory()
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
.border-radius-little {
  background-color: transparent;
  align-content: center;
}
</style>
