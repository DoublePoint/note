import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isRelogin } from '@/utils/request'
import Const from '@/utils/const.js'
import cacheUtil from '@/plugins/cache.js'
import { getAKSKStorageKey } from '@/api/gitee/gitee.js'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register', '/init', '/page']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      if (cacheUtil.local.getJSON(getAKSKStorageKey()) == undefined) {
        next({ path: '/init', query: to.query })
        NProgress.done()
      } else {
        next()
      }
    } else {
      // if (store.getters.roles.length === 0) {
      //   isRelogin.show = true;
      //   // 判断当前用户是否已拉取完user_info信息
      //   store
      //     .dispatch("GetInfo")
      //     .then(() => {
      //       isRelogin.show = false;
      //       store.dispatch("GenerateRoutes").then((accessRoutes) => {
      //         // 根据roles权限生成可访问的路由表
      //         router.addRoutes(accessRoutes); // 动态添加可访问路由表
      //         next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
      //       });
      //     })
      //     .catch((err) => {
      //       store.dispatch("LogOut").then(() => {
      //         Message.error(err);
      //         next({ path: "/" });
      //       });
      //     });
      // } else {
      //   next();
      // }
      next()
    }
  } else {
    // 没有token
    if (to.path === '/login') {
      // debugger
      if (cacheUtil.local.getJSON(getAKSKStorageKey()) == null) {
        next({ path: '/init', query: to.query })
        NProgress.done()
      } else {
        next()
      }
    }
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/init', query: to.query })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
