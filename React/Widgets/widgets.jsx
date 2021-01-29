import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './frontend/root';
import Clock from './frontend/clock';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.root')
  ReactDOM.render(<RootComponent />, root)
})