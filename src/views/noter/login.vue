<template>
  <div>
    <template v-if="device !== 'mobile'">
      <div style="display: flex; flex-direction: column; align-items: center">
        <div style="font-size: 50px; margin-top: 12vh; font-weight: 700; margin-bottom: 24px; text-align: center; line-height: 1.1; max-width: 380px">Log in</div>
        <div class="notion-login" style="width: 100%; display: flex; flex-direction: column; align-items: center; max-width: 320px; margin-bottom: 16vh">
          <div style="display: flex; flex-direction: column; width: 100%">
            <el-row>
              <el-button type="primary" class="login-thrid" @click="goGiteeLogin">
                <img
                  alt="Gitee — 基于 Git 的代码托管和研发协作平台"
                  height="18"
                  style="margin-top: -3px; vertical-align: middle"
                  :src="giteeLogoImg"
                  title="Gitee — 基于 Git 的代码托管和研发协作平台"
                  width="24"
                />
                <span style="margin-left: 5px">使用Gitee账号登录</span>
              </el-button>
            </el-row>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import giteeLogoImg from '@/assets/images/noter/gitee-logo.svg'
import { getGiteeScope } from '@/utils/auth.js'
import cacheUtil from '@/plugins/cache.js'
import { getAKSKStorageKey } from '@/api/gitee/gitee.js'

export default {
  components: {},
  data() {
    return {
      giteeLogoImg,
    }
  },
  created() {
    if (getGiteeScope() != undefined) {
      this.$modal.loading('登录跳转中...')
      setTimeout(() => {
        this.goGiteeLogin()
      }, 2000)
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device']),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val,
        })
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      },
    },
  },
  methods: {
    goGiteeLogin() {
      let scope = getGiteeScope()
      const akskForm = cacheUtil.local.getJSON(getAKSKStorageKey())
      let redirect_uri = akskForm.redirect_uri + '&response_type=code'
      let client_id = akskForm.client_id
      // debugger
      window.location.href = `https://gitee.com/oauth/authorize?scope=${scope == undefined ? '' : scope}&client_id=${client_id}&redirect_uri=${redirect_uri}`
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.href = '/index'
          })
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.login-thrid {
  font-family: inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
  background: white;
  border: 1px solid rgba(15, 15, 15, 0.15);
  color: rgb(17, 17, 17);
  line-height: 36px;
  height: 36px;
  transition: background 20ms ease-in 0s;
  display: inline-flex;
  justify-content: center;
  white-space: nowrap;
  align-items: center;
  width: 100%;
  font-weight: 500;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 1px 2px;
  &:hover {
    background: #f4f4f5;
  }
  &:active {
    background: #909399;
  }
}
</style>
