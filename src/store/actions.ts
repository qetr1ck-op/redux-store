export const ADD_TODO = '[Todo] add'
export const REMOVE_TODO = '[Todo] remove'

type Payload = { [key: string]: any }

export class AddTodoAction {
  readonly type = ADD_TODO
  constructor(private payload: Payload) {}
}

export class RemoveTodoAction {
  readonly type = REMOVE_TODO
  constructor(private payload: Payload) {}
}
