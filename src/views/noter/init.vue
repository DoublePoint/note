<template>
  <div class="navbar">
    <template v-if="device !== 'mobile'">
      <el-form ref="dataform" :model="form" :readonly="false" label-width="200px">
        <el-form-item label="Client ID" prop="client_id" :rules="[{ required: true, message: '请输入：Client ID', trigger: 'blur' }]">
          <el-input v-model="form.client_id"></el-input>
        </el-form-item>
        <el-form-item label="Client Secret" prop="client_secret" :rules="[{ required: true, message: '请输入：Client Secret', trigger: 'blur' }]">
          <el-input v-model="form.client_secret"></el-input>
        </el-form-item>
        <el-form-item label="Redirect URI" prop="redirect_uri" :rules="[{ required: true, message: '请输入：Redirect URI', trigger: 'blur' }]">
          <el-input v-model="form.redirect_uri"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存AK-SK信息</el-button>
          <el-button @click="onRedirect">直接跳转到登录页</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations, mapAction } from 'vuex'
import cacheUtil from '@/plugins/cache.js'
import { getAKSKStorageKey, requestGiterInfo, requestToken } from '@/api/gitee/gitee.js'
import { getToken, setToken, setRefreshToken, setGiteeScope, setUserInfo } from '@/utils/auth.js'
import Const from '@/utils/const.js'
import { getRefreshToken } from '../../utils/auth'
export default {
  components: {},
  data() {
    return {
      form: {
        client_id: '',
        redirect_uri: '',
        client_secret: '',
      },
    }
  },
  created() {
    let data = cacheUtil.local.getJSON(getAKSKStorageKey())
    if (data != null) {
      this.form = data
    } else {
      return
    }
    let token = getToken()
    if (token === undefined) {
      //从Gitee页面跳转过来，需要首次初始化token信息
      if (this.$route.query.code != null) {
        this.initToken()
      } else {
        this.$router.push('/login')
      }
    } else {
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },
  methods: {
    onSubmit() {
      this.$refs['dataform'].validate((valid) => {
        if (valid) {
          cacheUtil.local.setJSON(getAKSKStorageKey(), this.form)
          this.$modal.msgSuccess('保存成功，页面跳转中...')
          setTimeout(() => {
            this.onRedirect()
          }, 2000)
        } else {
          this.$modal.msgError('请录入必填信息.')
        }
      })
    },
    onRedirect() {
      this.$router.push('/login')
    },
    initToken() {
      // debugger
      requestToken(this.$route.query.code)
        .then((response) => {
          setToken(response.access_token)
          setRefreshToken(response.refresh_token)
          setGiteeScope(response.scope)
          return requestGiterInfo()
        })
        .then((res) => {
          cacheUtil.local.setJSON(Const.LOCAL_STORAGE_USER_INFO_KEY, res)
        })
        .then(() => {
          this.$modal.msgSuccess('保存成功，页面跳转中...')
          this.$router.push('/index')
        })
    },
    refreshToken() {},
  },
}
</script>

<style lang="scss" scoped></style>
