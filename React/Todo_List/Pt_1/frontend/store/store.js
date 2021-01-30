import { createStore } from 'redux'
import rootReducer from '../reducers/root_reducer.js'

const configureStore = function (preloadedState = {}) {
  const store = createStore(rootReducer, preloadedState)
  return store
} 

export default configureStore;