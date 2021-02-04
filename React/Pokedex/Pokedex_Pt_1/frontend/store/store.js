import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
// import { thunk } from 'redux'
import rootReducer from '../reducers/root_reducer';
import thunk from '../middleware/thunk'

export const configureStore = () => (
  createStore(
    rootReducer, 
    applyMiddleware(logger, thunk)
  )
)