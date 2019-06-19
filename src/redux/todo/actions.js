import {
  TODO_ADD_KEY,
  TODOS_READ_REQUEST_KEY,
  TODOS_READ_KEY,
  TODOS_ADD_REQUEST_KEY,
  TODOS_READ_BY_ID_REQUEST_KEY,
  TODOS_DELETE_REQUEST_KEY
} from './constants'
import { createRequestThunk } from '../action-helpers'
import api from 'api'
import { red } from 'logger'

export const todoAdd = (newTodo) => {
  return {
    type: TODO_ADD_KEY,
    payload: newTodo
  }
}

// Read
export const todosRead = (todos) => {
  return {
    type: TODOS_READ_KEY,
    payload: todos
  }
}

export const todosReadRequest = createRequestThunk({
  request: api.todos.read,
  key: TODOS_READ_REQUEST_KEY,
  success: [todosRead],
  failure: [
    (error) => console.log('(7) todoReadRequest: request failed', error)
  ]
})

export const todosReadByIdRequest = createRequestThunk({
  request: api.todos.readById,
  key: TODOS_READ_BY_ID_REQUEST_KEY,
  success: [todosRead],
  failure: [
    (error) => red('(7) todoReadByIdRequest: request failed', error)
  ]
})

export const todoAddRequest = createRequestThunk({
  request: api.todos.create,
  key: TODOS_ADD_REQUEST_KEY,
  success: [todoAdd],
  failure: [
    (error) =>
      console.log('(7) todoAddRequestCall: request failed', error)
  ]
})

export const todoDeleteRequest = createRequestThunk({
  request: api.todos.delete,
  key: TODOS_DELETE_REQUEST_KEY,
  success: [todosReadRequest],
  failure: [
    (error) =>
      console.log('(7) todoDeleteRequestCall: request failed', error)
  ]
})
