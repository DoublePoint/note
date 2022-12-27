<template>
  <div class="navbar">
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        {{ this.$route.query.code }}
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapAction } from 'vuex'
import { requestToken } from '@/api/gitee/gitee.js'
import { getToken, setToken, setRefreshToken, setGiteeScope, setUserInfo } from '@/utils/auth.js'
import Const from '@/utils/const.js'

export default {
  components: {},
  created() {
    // debugger;
    let token = getToken()
    if (token === undefined) {
      this.getToken()
    } else {
      this.$router.push('/index')
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.settings.theme,
      sideTheme: (state) => state.settings.sideTheme,
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
  },
  methods: {
    getToken() {
      debugger
      requestToken(this.$route.query.code)
        .then((response) => {
          setToken(response.access_token)
          setRefreshToken(response.refresh_token)
          setGiteeScope(response.scope)
        })
        .then(() => {
          this.$router.push('/index')
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
