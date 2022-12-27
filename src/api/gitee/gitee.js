import request from '@/utils/request'
import { getToken } from '@/utils/auth.js'
import { decodeBase64Content, encodeBase64Content } from '../../utils/base64'
import Const from '@/utils/const.js'
import cacheUtil from '@/plugins/cache.js'

export function getAKSKStorageKey() {
  return Const.AK_SK_KEY
}

// 查询菜单列表
export function requestToken(code) {
  const akskForm = cacheUtil.local.getJSON(getAKSKStorageKey())
  let redirect_uri = akskForm.redirect_uri
  let client_id = akskForm.client_id
  let client_secret = akskForm.client_secret
  return request({
    url: `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${client_id}&redirect_uri=${redirect_uri}&client_secret=${client_secret}`,
    method: 'post',
  })
}

export function requestGiterInfo(access_token) {
  if (access_token == undefined) {
    access_token = getToken()
  }
  return request({
    url: `https://gitee.com/api/v5/user?access_token=${access_token}`,
    method: 'get',
  })
}
export function requestNoterRepository(owner, repo, access_token) {
  if (access_token == undefined) {
    access_token = getToken()
  }
  return request({
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}?access_token=${access_token}`,
    method: 'get',
  })
}
// 获取仓库具体路径下的内容
export function getFileContent(path, access_token) {
  if (access_token == undefined) {
    access_token = getToken()
  }
  const userInfo = cacheUtil.local.getJSON(Const.LOCAL_STORAGE_USER_INFO_KEY)
  const owner = userInfo.name
  const repo = Const.BASE_REPOSITORY_NAME
  return request({
    // url: `https://gitee.com/api/v5/repos/${owner}/${repo}/git/blobs/${sha}`,
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
    method: 'get',
  })
}

export function createNewRepository(name, access_token) {
  if (access_token == undefined) {
    access_token = getToken()
  }
  return request({
    url: `https://gitee.com/api/v5/user/repos`,
    method: 'post',
    data: {
      name,
    },
  })
}
export function createGitDirectory(path, access_token) {
  if (access_token == undefined) {
    access_token = getToken()
  }

  const userInfo = cacheUtil.local.getJSON(Const.LOCAL_STORAGE_USER_INFO_KEY)
  const owner = userInfo.name
  const repo = Const.BASE_REPOSITORY_NAME
  let obj = {}
  obj.access_token = access_token
  obj.owner = owner
  obj.repo = repo
  obj.path = path
  return createDirectory(obj)
}

export function getSelectedMenu(path) {
  let giteeDirTree = cacheUtil.local.getJSON(Const.GITEE_DIRECTORY_TREE)
  let selectedGitMeta = giteeDirTree.find((val) => val.path === path.substring(1, path.length))
  return selectedGitMeta
}

export function createDirectory(obj) {
  let { owner, repo, path } = { ...obj }
  obj.content = 'init'
  obj.path += '/init.txt'
  obj.message = 'Init directory'
  return request({
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
    method: 'post',
    data: {
      access_token: obj.access_token,
      content: encodeBase64Content(obj.content),
      message: obj.message,
    },
  })
}
// 新建文件
export function saveGitFile(path, filecontent, access_token) {
  if (access_token == undefined) {
    access_token = getToken()
  }
  const userInfo = cacheUtil.local.getJSON(Const.LOCAL_STORAGE_USER_INFO_KEY)
  const owner = userInfo.name
  const repo = Const.BASE_REPOSITORY_NAME
  return request({
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
    method: 'post',
    data: {
      access_token,
      content: encodeBase64Content(filecontent),
      message: 'Save File',
    },
  })
}

export function createGitFile(path, filecontent, access_token) {
  if (access_token == undefined) {
    access_token = getToken()
  }
  const userInfo = cacheUtil.local.getJSON(Const.LOCAL_STORAGE_USER_INFO_KEY)
  const owner = userInfo.name
  const repo = Const.BASE_REPOSITORY_NAME
  return request({
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
    method: 'post',
    data: {
      access_token,
      content: encodeBase64Content(filecontent),
      message: 'Save File',
    },
  })
}

export function updateGitFile(path, filecontent, sha, access_token) {
  if (access_token == undefined) {
    access_token = getToken()
  }
  const userInfo = cacheUtil.local.getJSON(Const.LOCAL_STORAGE_USER_INFO_KEY)
  const owner = userInfo.name
  const repo = Const.BASE_REPOSITORY_NAME
  return request({
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
    method: 'put',
    data: {
      access_token,
      content: encodeBase64Content(filecontent),
      message: 'Save File',
      sha,
    },
  })
}

export function getDirectories(access_token, repo) {
  if (access_token == undefined) {
    access_token = getToken()
  }
  const userInfo = cacheUtil.local.getJSON(Const.LOCAL_STORAGE_USER_INFO_KEY)
  let sha = 'master'
  let owner = userInfo.name
  if (repo == undefined) {
    repo = Const.BASE_REPOSITORY_NAME
  }
  return request({
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/git/trees/${sha}?recursive=1&access_token=${access_token}`,
    method: 'get',
  })
}

export function refreshGiterInfo() {
  return requestGiterInfo().then((res) => {
    cacheUtil.local.setJSON(Const.LOCAL_STORAGE_USER_INFO_KEY, res)
  })
}

export function deleteDirectories(info) {
  const { owner, repo, path, sha, message } = { ...info }
  return request({
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}?sha=${sha}&message=${message}`,
    method: 'delete',
  })
}
