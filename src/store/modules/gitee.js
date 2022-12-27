import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

const gitee = {
  state: {
    notedirs: [],
  },
  mutations: {
    SET_NOTEDIRS: (state, notedirs) => {
      state.notedirs = notedirs
    },
  },
  actions: {},
}

export default gitee
