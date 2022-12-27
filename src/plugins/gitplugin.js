import { getToken } from '@/utils/auth.js'
import Const from '@/utils/const.js'
import cacheUtil from '@/plugins/cache.js'
import dirParse from '@/api/tool/dirparse.js'
import * as gitClient from '@/api/gitee/gitee.js'

export function refreshGitTree() {
  return gitClient.getDirectories().then((res) => {
    cacheUtil.local.setJSON(Const.GITEE_DIRECTORY_TREE, res.tree)
  })
}
