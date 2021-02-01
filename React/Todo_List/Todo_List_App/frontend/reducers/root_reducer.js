import { combineReducers } from 'redux';
import todosReducer from './todos_reducer.js'
import stepsReducer from './steps_reducer.js'
import errorReducer from './error_reducer.js'

const rootReducer = combineReducers({
  todos: todosReducer,
  steps: stepsReducer,
  errors: errorReducer
});

export default rootReducer;