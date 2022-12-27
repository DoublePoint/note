<template>
  <div :style="'height:' + height" v-loading="loading" element-loading-text="正在加载页面，请稍候！">
    <iframe :id="iframeId" style="width: 100%; height: 100%" :src="mainIframeSrc" frameborder="no"></iframe>
  </div>
</template>

<script>
import MainIframe from '../gitee/mainiframe/MainIframe.vue'
export default {
  props: {
    src: {
      type: String,
      default: '/',
    },
    iframeId: {
      type: String,
    },
  },
  components: { MainIframe },
  data() {
    return {
      loading: false,
      height: document.documentElement.clientHeight - 94.5 + 'px;',
    }
  },
  computed: {
    mainIframeSrc() {
      return '/mainiframe?gitpath=' + this.$store.state.tagsView.iframeViews[0].gitpath
    },
  },
  mounted() {
    var _this = this
    const iframeId = ('#' + this.iframeId).replace(/\//g, '\\/')
    const iframe = document.querySelector(iframeId)
    // iframe页面loading控制
    if (iframe.attachEvent) {
      this.loading = true
      iframe.attachEvent('onload', function () {
        _this.loading = false
        iframe.$store = _this.$store
      })
    } else {
      this.loading = true
      iframe.onload = function () {
        _this.loading = false
        iframe.contentWindow.$store = _this.$store
      }
    }
  },
}
</script>
