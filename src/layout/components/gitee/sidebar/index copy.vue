<template>
  <div :class="{'has-logo':showLogo}"
    :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
      <div style="text-align:center;margin-top: 25px;"
        v-if="!hasNoterRepository">
        <el-row>
          <el-button type="primary" @click="handleCreateWS">创建一个工作空间</el-button>
        </el-row>
      </div>
      <div v-else>
        <el-tree :data="data" show-checkbox node-key="id"
          :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"
          :props="defaultProps">
        </el-tree>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import variables from "@/assets/styles/variables.scss";
import { requestNoterRepository, requestGiterInfo, createNewRepository } from '@/api/gitee/gitee.js'
import '@/api/tool/dirparse.js'
export default {
  components: {},
  data() {
    return {
      hasNoterRepository: false,
      data: [
        {
          id: 0,
          label: 'Root',
          children: [
            {
              id: 1,
              label: '一级 1',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }
          ]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dictName: ""
    }
  },
  created() {
    this.initRepository();
  },

  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["sidebarRouters", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    initRepository() {
      requestGiterInfo().then((res) => {
        let login = res.login;
        let noterRepository = "Dictronary";
        return requestNoterRepository(login, noterRepository);
      }).then(res => {
        // debugger
        this.hasNoterRepository = true;
        // console.log(res);
      }).catch((e) => {
        //未找到字典仓库
        console.log(e);
        if (e.response.status = 404) {
          this.hasNoterRepository = false;
        }
        else {
          console.error(e);
        }
      })
    },
    handleCreateWS() {
      createNewRepository('Dictronary').then(res => {
        this.$modal.msgSuccess("新增成功");
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      })
    }
  }

};
</script>
