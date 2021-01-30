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