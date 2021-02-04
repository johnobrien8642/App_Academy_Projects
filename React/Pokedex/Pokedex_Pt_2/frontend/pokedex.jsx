import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { createSinglePokemon } from './util/api_util'


document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  const store = configureStore();
  window.store = store;
  window.createSinglePokemon = createSinglePokemon;
  ReactDOM.render(<Root store={store} />, rootEl)
})