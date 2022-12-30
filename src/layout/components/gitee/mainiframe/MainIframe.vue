<template>
  <div class="main">
    <mavon-editor v-if="isMDShow" class="mavon" navigation @save="save" v-model="content"></mavon-editor>
    <nofile v-if="is404Show"></nofile>
  </div>
</template>

<script>
//markdown支持
import variables from '@/assets/styles/variables.scss'
import { mapState } from 'vuex'
import { updateGitFile, getFileContent, getSelectedMenu } from '@/api/gitee/gitee.js'
import { decodeBase64Content, encodeBase64Content } from '@/utils/base64'
import gitplugin from '@/plugins/gitplugin.js'
import nofile from '@/views/error/404nofile.vue'
import defaultPlugin from '@/plugins/defaultplugin.js'

export default {
  name: 'MainIframe',
  computed: {
    ...mapState(['tagsView']),
  },
  components: { nofile },
  data() {
    return {
      previewBackground: variables.baseColor,
      content: '',
      gitPath: '',
      selectedFile: {},
      isMDShow: false,
      is404Show: false,
    }
  },
  mounted() {
    // debugger
    this.gitPath = this.$route.query.gitpath
    if (this.gitPath == null) {
      console.warn('Gipath is null.')
      return
    }
    debugger
    gitplugin.isRepositoryExist(defaultPlugin.getDefaultRepositoryName()).then((res) => {
      if (res == true) {
        this.initContent()
      }
    })
  },
  methods: {
    save() {
      updateGitFile(this.gitPath, this.content, this.selectedFile.sha).then((res) => {
        this.$modal.msgSuccess('保存成功')
        gitplugin.refreshGitTree().then((res) => {
          this.initContent()
        })
      })
    },
    initContent() {
      this.selectedFile = getSelectedMenu(this.gitPath)
      getFileContent(this.gitPath).then((res) => {
        if (res.content == undefined) {
          this.isMDShow = false
          this.is404Show = true
          return
        }
        this.content = decodeBase64Content(res.content)
        this.isMDShow = true
        this.is404Show = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
}
.mavon {
  min-height: calc(100vh - 90px);
  width: 100%;
}
</style>
