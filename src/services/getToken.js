import config from "../config"

function getCookie() {
  let name = "accessToken="
  let decodedCookie = decodeURIComponent(document.cookie)
    .split(';')
    .map((v) => v.trim())

  const accessToken = decodedCookie.find((v) => v.indexOf(name) === 0)
  if (accessToken) return accessToken.substring(name.length, accessToken.length)
  return ''
}

function setCookie(accessToken, expired) {
  const now = new Date()
  const time = now.getTime()
  const expireTime = time + 1000 * (expired - 1)
  now.setTime(expireTime)

  document.cookie = `accessToken=${accessToken};max-age=${expired};path=/`
}

export function removeToken() {
  document.cookie = "accessToken=; max-age=-0; path=/;"
}

export async function getToken() {
  const currentAccessToken = getCookie()
  if (currentAccessToken) return currentAccessToken

  const clientBase64 = window.btoa(`${config.api.clientId}:${config.api.clientSecret}`)
  const param = new URLSearchParams()
  param.append('grant_type', 'client_credentials')

  const response = await fetch(`${config.api.authUrl}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${clientBase64}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: param,
  }).then((res) => res.json())

  setCookie(response.access_token, response.expires_in)

  return response.access_token
}

function combineRequestGetToken() {
  let promises = []
  let loading = false

  return async () => {
    if (loading) {
      return new Promise((_resolve) => {
        promises.push(_resolve)
      })
    }

    loading = true

    const token = await getToken()
    promises.map((resolve) => resolve(token))
    promises = []
    return token
  }
}

export default combineRequestGetToken()
