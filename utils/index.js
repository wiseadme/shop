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

export function getCookie(name) {
  if (process.browser) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
  }
}

export function errorHandler(err) {
  console.log(err)
}


export default {
  isJWTValid,
  setOrRemoveFromLS,
  errorHandler
}
