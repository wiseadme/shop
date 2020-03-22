import jwtDecode from 'jwt-decode'

export function isJWTValid(token) {
  if (!token) {
    return false
  }
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return (new Date().getTime() / 1000) < expires
}

export function lStorage(key, value = null, replace = false) {
  if (!value && !replace) {
    return JSON.parse(localStorage.getItem(key))
  } else if (!value && replace) {
    localStorage.removeItem(key)
  } else if (value && replace) {
    localStorage.removeItem(key)
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, JSON.stringify(value))
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
  lStorage,
  debounce,
  getCookie
}
