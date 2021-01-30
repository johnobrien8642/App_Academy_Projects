import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.jsx';
import configureStore from './store/store.js';
import { stepsByTodoId } from './reducers/selectors.js';


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.stepsByTodoId = stepsByTodoId;
  window.store = store

  ReactDOM.render(<Root store={store}/>, document.querySelector('#content'))
})