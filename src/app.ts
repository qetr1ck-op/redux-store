import { renderTodos } from './utils'
import * as fromStore from './store'

const input = document.querySelector('input') as HTMLInputElement
const button = document.querySelector('button') as HTMLButtonElement
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement
const todoList = document.querySelector('.todos') as HTMLLIElement

const store = new fromStore.Store({
  todos: fromStore.todoReducer
})

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return

    const payload = { label: input.value, complete: false }

    store.dispatch(new fromStore.AddTodoAction(payload))

    input.value = ''
  },
  false
)

const unsubscribe = store.subscribe(state => {
  renderTodos(state.todos)
})

destroy.addEventListener('click', unsubscribe as any)

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement
  if (target.nodeName.toLowerCase() === 'button') {
    const payload = JSON.parse(target.dataset.todo as string)
    store.dispatch(new fromStore.RemoveTodoAction(payload))
  }
})
