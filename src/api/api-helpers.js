import fetch from 'cross-fetch'
// import { orange } from 'logger'

// const logRequest = (url, options, headers) => {
//   console.group('fetchJson')
//   orange('url', url)
//   orange('options', options)
//   orange('headers', headers)
//   console.groupEnd()
// }

export const fetchJson = async (url, options = {}) => {
  let headers = {
    ...options.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const r1 = await fetch(url, {
    ...options,
    headers,
  })
  const { status } = r1
  if (status >= 200 && status < 300) {
    return await r1.json()
  } else {
    const err = {
      status: r1.status,
      statusText: r1.statusText,
      url: r1.url,
    }
    throw err
  }
}

export default { fetchJson }