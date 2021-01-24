const SnakeView = require('../js/snake-view.js')

$(function () {
  const rootEl = $('.snake-game');
  new SnakeView(rootEl);
})