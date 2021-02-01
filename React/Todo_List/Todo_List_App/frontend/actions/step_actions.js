import * as StepAPIUtil from '../util/step_api_util.js'
import { receiveErrors, clearErrors } from './error_actions.js';

export const RECEIVE_STEPS = "RECEIVE_STEPS";
export const RECEIVE_STEP = "RECEIVE_STEP";
export const DELETE_STEP = "DELETE_STEP";

export const receiveSteps = steps => {
  return {
    type: RECEIVE_STEPS,
    steps,
  };
};

export const receiveStep = step => {
  return {
    type: RECEIVE_STEP,
    step,
  }
}

export const deleteStep = step => {
  return {
    type: DELETE_STEP,
    step,
  }
}

export const requestSteps = todoId => dispatch => (
  StepAPIUtil.fetchSteps(todoId).then(steps => dispatch(receiveSteps(steps)))
)

export const createStep = (step) => dispatch => (
  StepAPIUtil.createStep(step)
    .then(step => { dispatch(receiveStep(step)); dispatch(clearErrors()) },
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateStep = (todoId, step) => dispatch => (
  StepAPIUtil.updateStep(todoId, step)
    .then(step => { dispatch(receiveStep(step)); dispatch(clearErrors()) },
      err => dispatch(receiveErrors(err.responseJSON)))
)

export const removeStep = step => dispatch => (
  StepAPIUtil.deleteStep(step).then(step => dispatch(deleteStep(step)))
)