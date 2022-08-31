import config from '../config'
import getToken from './getToken'

async function api(url, signal, options = {}) {
  const token = await getToken()

  const defaultOptions = {
    signal,
    method: 'GET',
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    }
  }

  return fetch(`${config.api.baseUrl}${url}`, defaultOptions).then((response) => response.json())
}

export default api