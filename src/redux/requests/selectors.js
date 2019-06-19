const noStatus = {
  status: 'none',
  error: null
}
export const getRequest = (state, key) => {
  if (state.requests[key] === null) {
    return noStatus
  } else {
    return state.requests[key]
  }
}
