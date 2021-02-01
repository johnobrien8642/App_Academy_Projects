import {
  RECEIVE_STEPS,
  RECEIVE_STEP,
  DELETE_STEP
} from "../actions/step_actions";



const stepReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = {};

  switch (action.type) {
    case RECEIVE_STEPS:
      nextState = Object.assign({}, state);
      action.steps.forEach(step => {
        nextState[step.id] = step;
      });
      return nextState;
    case RECEIVE_STEP:
      const newTodo = { [action.step.id]: action.step }
      return Object.assign({}, state, newTodo)
    case DELETE_STEP:
      nextState = Object.assign({}, state);
      delete nextState[action.step.id]
      return nextState;
    default:
      return state
  }
}

export default stepReducer;
