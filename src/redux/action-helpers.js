// eslint-disable-next-line
import { red } from '../logger'
import {
  requestPending,
  requestSuccess,
  requestFailed
} from './requests/actions'

export const logError = (err, key) => {
  red(`actions.logError(key:${key})`, err)
}

export const createRequestThunk = ({
  request,
  key,
  start = [],
  success = [],
  failure = []
}) => {
  return (...args) => async dispatch => {
    const requestKey = typeof key === 'function' ? key(...args) : key
    start.map(async actionCreator => {
      await dispatch(actionCreator())
    })
    await dispatch(requestPending(requestKey))
    try {
      const data = await request(...args)
      await dispatch(requestSuccess(requestKey))
      success.map(async actionCreator => {
        await dispatch(actionCreator(data))
      })
    } catch (e) {
      await dispatch(requestFailed(e, requestKey))
      failure.map(async actionCreator => {
        await dispatch(actionCreator(e))
      })
    }
  }
}
