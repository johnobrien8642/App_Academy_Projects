import {
  RECEIVE_STEPS,
  RECEIVE_STEP,
  DELETE_STEP
} from "../actions/step_actions";

const initialState = {
  1: {
    id: 1,
    title: "get soap",
    todo_id: 1,
    done: false
  },
  2: {
    id: 2,
    title: "get dog soap",
    todo_id: 2,
    done: true
  }
};

const stepReducer = (state = initialState, action) => {
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
