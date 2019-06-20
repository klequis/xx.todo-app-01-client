import { green } from 'logger'
export function getAllTodos(state) {
  green('8. getAllTodos')
  return state.todos
}
