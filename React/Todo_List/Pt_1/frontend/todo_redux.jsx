import React from 'react';
import ReactDOM from 'react-dom'
import configureStore from './store/store.js';
import { receiveSteps,
        receiveStep,
        deleteStep } from './actions/step_actions.js'

const store = configureStore()

document.addEventListener('DOMContentLoaded', () => {
  window.store = store;
  window.deleteStep = deleteStep
  window.receiveStep = receiveStep
  window.receiveSteps = receiveSteps
})