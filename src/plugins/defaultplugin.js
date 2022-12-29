import cacheplugin from '@/plugins/cacheplugin.js'
import Constant from '@/utils/const.js'

// 获取默认仓库名称
function getDefaultRepositoryName() {
  if (cacheplugin.getRepositoryName() == null) {
    cacheplugin.setRepositoryName(Constant.BASE_REPOSITORY_NAME)
  }
  return cacheplugin.getRepositoryName()
}

export default {
  getDefaultRepositoryName,
}
