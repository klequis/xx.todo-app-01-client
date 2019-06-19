import { orange } from 'logger'

const logRequest = (url, options, headers) => {
  console.group('fetchJson')
  orange('url', url)
  orange('options', options)
  orange('headers', headers)
  console.groupEnd()
}

export const fetchJson = (url, options = {}) => {
  let headers = {
    ...options.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  logRequest(url, options, headers)
  return (
    fetch(url, {
      ...options,
      headers,
    }).then(res => {
      orange('res.headers', res)
      const { status } = res
      if (status >= 200 && status < 300) {
        return res.json()
      } else {
        const err = {
          status: res.status,
          statusText: res.statusText,
          url: res.url,
        }
        throw err
      }
    })
  )
}

export default { fetchJson }