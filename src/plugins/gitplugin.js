import { getToken } from '@/utils/auth.js'
import Const from '@/utils/const.js'
import cacheUtil from '@/plugins/cache.js'
import dirParse from '@/api/tool/dirparse.js'
import * as gitClient from '@/api/gitee/gitee.js'

const obj = {}
obj.refreshGitTree = () => {
  return gitClient.getDirectories().then((res) => {
    cacheUtil.local.setJSON(Const.GITEE_DIRECTORY_TREE, res.tree)
  })
}

obj.isRepositoryExist = (repoName) => {
  return gitClient.getAllRepos().then((res) => {
    const repoArr = res
    const repo = repoArr.find((item) => item.name == repoName)
    return repo != undefined
  })
}

export default obj
