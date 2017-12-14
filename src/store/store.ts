export type State = { [key: string]: any }
type Subscribers = Function[]
type Reducers = { [key: string]: Function }

const mockedState: State = {
  loaded: false,
  loading: false,
  todos: [{ label: 'eat pizza', complete: false }]
}

export class Store {
  private subscribers: Subscribers = []

  constructor(private reducers: Reducers = {}, private state = mockedState) {}

  get value() {
    return this.state
  }

  subscribe(cb): Function {
    this.subscribers = [...this.subscribers, cb]
    this.emit()
    return () => {
      this.subscribers = this.subscribers.filter(fn => fn !== cb)
    }
  }

  dispatch(action) {
    this.reduce(this.state, action)
    this.emit()
  }

  private reduce(state: State, action): State {
    return Object.keys(this.reducers).reduce((newState, stateName) => {
      return (newState[stateName] = this.reducers[stateName](state[stateName], action))
    }, state)
  }

  private emit() {
    this.subscribers.forEach(cb => cb(this.value))
  }
}
