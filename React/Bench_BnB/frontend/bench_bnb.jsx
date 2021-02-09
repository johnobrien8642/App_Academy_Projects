import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root.jsx'
import configureStore from './store/store'
import { fetchBenches, receiveBenches } from './actions/bench_actions'
import { login } from './util/session_api_util'



document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    }
    store = configureStore(preloadedState)
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  //delete after testing!!!!
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchBenches = fetchBenches;
  
  //delete after testing!!!

  const root = document.getElementById('root')
  ReactDOM.render(<Root store={ store }/>, root)
})