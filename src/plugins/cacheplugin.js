import Constant from '@/utils/const.js'
import cacheUtil from '@/plugins/cache.js'

let obj = {}
// 获取Sidebar信息
obj.getSidebarInfo = () => {
  return cacheUtil.local.getJSON(Constant.SIDEBAR_INFO)
}

// 设置Sidebar信息
obj.setSidebarInfo = (info) => {
  cacheUtil.local.setJSON(Constant.SIDEBAR_INFO, info)
}

// 设置Gitee目录树
obj.setGiteeDirectoryTree = (data) => {
  cacheUtil.local.setJSON(Constant.GITEE_DIRECTORY_TREE, data)
}

obj.getGiteeDirectoryTree = () => {
  return cacheUtil.local.getJSON(Constant.GITEE_DIRECTORY_TREE)
}

// 设置默认仓库名称
obj.setRepositoryName = (data) => {
  cacheUtil.local.set(Constant.BASE_REPOSITORY_NAME_KEY, data)
}
obj.getRepositoryName = () => {
  return cacheUtil.local.get(Constant.BASE_REPOSITORY_NAME_KEY)
}

export default obj
