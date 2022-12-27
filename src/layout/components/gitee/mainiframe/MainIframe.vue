<template>
  <div class="main">
    <mavon-editor class="mavon" navigation @save="save" v-model="content"></mavon-editor>
  </div>
</template>

<script>
//markdown支持
import variables from '@/assets/styles/variables.scss'
import { mapState } from 'vuex'
import { updateGitFile, getFileContent, getSelectedMenu } from '@/api/gitee/gitee.js'
import { decodeBase64Content, encodeBase64Content } from '@/utils/base64'
import { refreshGitTree } from '@/plugins/gitplugin.js'

export default {
  name: 'MainIframe',
  computed: {
    ...mapState(['tagsView']),
  },
  data() {
    return {
      previewBackground: variables.baseColor,
      content: '',
      gitPath: '',
      selectedFile: {},
    }
  },
  mounted() {
    // debugger
    this.gitPath = this.$route.query.gitpath
    if (this.gitPath == null) {
      console.warn('Gipath is null.')
      return
    }
    refreshGitTree().then((res) => {
      this.initContent()
    })
  },
  methods: {
    save() {
      updateGitFile(this.gitPath, this.content, this.selectedFile.sha).then((res) => {
        this.$modal.msgSuccess('保存成功')
        refreshGitTree().then((res) => {
          this.initContent()
        })
      })
    },
    initContent() {
      this.selectedFile = getSelectedMenu(this.gitPath)
      getFileContent(this.gitPath).then((res) => {
        this.content = decodeBase64Content(res.content)
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
