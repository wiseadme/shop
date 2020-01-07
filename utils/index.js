import jwtDecode from 'jwt-decode'

export function isJWTValid(token) {
  if (!token) {
    return false
  }
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return (new Date().getTime() / 1000) < expires
}

export function setOrRemoveFromLS(name, value) {
  if (value && process.browser) {
    window.localStorage.setItem(name, JSON.stringify(value))
  } else {
    if (process.browser) {
      window.localStorage.removeItem(name)
    }
  }
}

export function debounce(f, ms) {
  let isComedown = false
  return function () {
    if (isComedown) return
    f.apply(this, arguments)
    isComedown = true
    setTimeout(() => isComedown = false, ms)
  }
}

export function getCookie(name) {
  if (process.browser) {
    let matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
  }
}

export default {
  isJWTValid,
  setOrRemoveFromLS,
  debounce,
  getCookie
}
