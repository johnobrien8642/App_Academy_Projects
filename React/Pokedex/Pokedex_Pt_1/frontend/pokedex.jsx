import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from './store/store'
import Root from './components/root.jsx'
import { receiveAllPokemon, requestAllPokemon } from './actions/pokemon_actions'
import { selectAllPokemon } from './reducers/selectors'


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root')
  ReactDOM.render(<Root store={store}/>, root)
})