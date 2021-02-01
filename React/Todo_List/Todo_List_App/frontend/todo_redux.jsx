import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.jsx';
import configureStore from './store/store.js';
import TodoDetailView from './components/todos/todo_detail_view'

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;
  
  ReactDOM.render(<Root store={store}/>, document.querySelector('.root'))
})