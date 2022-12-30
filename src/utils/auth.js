import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Refresh-Admin-Token'
const GiteeScopeKey = 'Gitee-scope'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    // expires: new Date().setHours(new Date().getHours() + 1),
    expires: 1,
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}

export function getGiteeScope() {
  return Cookies.get(GiteeScopeKey)
}

export function setGiteeScope(token) {
  return Cookies.set(GiteeScopeKey, token)
}

export function removeGiteeScope() {
  return Cookies.remove(GiteeScopeKey)
}
