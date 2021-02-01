import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/root_reducer.js'
import thunk from '../middleware/thunk.js'


const configureStore = function () {
  // const preloadedState = localStorage.state ?
  //   JSON.parse(localStorage.state) : {};
  const preloadedState = {}
  
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk))
    

  // store.subscribe(() => {
  //   localStorage.state = JSON.stringify(store.getState())
  // })
  // return store
} 

export default configureStore;