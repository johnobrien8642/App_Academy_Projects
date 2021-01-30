import { createStore } from 'redux'
import rootReducer from '../reducers/root_reducer.js'

const configureStore = function () {
  const preloadedState = localStorage.state ?
    JSON.parse(localStorage.state) : {};
  const store = createStore(rootReducer, preloadedState)

  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getstate())
  })
  return store
} 

export default configureStore;