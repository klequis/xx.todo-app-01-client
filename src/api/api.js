import { fetchJson } from './api-helpers'
import { orange, green } from 'logger'

// const rootUrl = process.env.NODE_ENV === 'development' ? '' : 'https://api.klequis-todo.tk'
// const rootUrl = 'https://api.klequis-todo.tk'
const rootUrl = ''
console.log('rootUrl (blank for dev):', rootUrl)


// Errors are handled by fetchJson()
export default {
  todos: {
    async read() {
      green('4. before-api.todos.read-callFetch')
      const data = await fetchJson(
        `${rootUrl}/api/todo`,
        {
          method: 'GET',
        }
      )
      green('5. after-api.todos.read-callFetch')
      return data
    },
    async readById(id) {
      const data = await fetchJson(
        `${rootUrl}/api/todo/${id}`,
        {
          method: 'GET',
        }
      )
      return data
    },
    async create(todo) {
      const data = await fetchJson(
        `${rootUrl}/api/todo`,
        {
          method: 'POST',
          body: JSON.stringify(todo)
        }
      )
      return data.data
    },
    async delete(_id) {
      green('2. before-api.todos.delete-callFetch')
      const data = await fetchJson(
        `${rootUrl}/api/todo/${_id}`,
        {
          method: 'DELETE'
        }
      )
      green('3. after-api.todos.delete-callFetch')
      return data
    }
  }
}