import { State } from './store'
import * as fromActions from './actions'

interface Action {
  type: string
  payload?: any
}

export const todoReducer = (state: any[], action: Action): State => {
  switch (action.type) {
    case fromActions.ADD_TODO: {
      return [...state, action.payload]
    }
    case fromActions.REMOVE_TODO: {
      return state.filter(todo => todo.label !== action.payload.label)
    }
  }
  return state
}
