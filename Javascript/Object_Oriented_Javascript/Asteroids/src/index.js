const GameView = require('./GameView')
const Game = require('./game')
window.Game = Game;
window.GameView = GameView;


window.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const g = new Game();
  new GameView(g, ctx).start(); 
});