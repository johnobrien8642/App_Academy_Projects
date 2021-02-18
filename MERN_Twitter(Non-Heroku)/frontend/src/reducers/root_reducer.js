import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';
import TweetsReducer from './tweets_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  tweets: TweetsReducer,
  errors: errorsReducer
})

export default rootReducer;