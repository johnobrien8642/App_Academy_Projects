import React from 'react';
import ReactDOM from 'react-dom';
import Game from './frontend/game'

document.addEventListener('DOMContentLoaded', function(){ 
  ReactDOM.render(<Game />, document.querySelector('#root'))
})