const Game = require('./game')

function GameView (game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.ship = game.ship;
}

GameView.prototype.bindKeyHandlers = function bindKeyHandlers () {
  const ship = this.ship;

  Object.keys(GameView.MOVES).forEach(function(k){
    const move = GameView.MOVES[k];
    key(k, function(){ ship.power(move)})
  })

  key("space", function () { ship.fireBullet(); });
}

GameView.prototype.animate = function animate (time) {
  const timeDelta = time - this.lastTime;
  
  this.game.step(timeDelta);
  this.game.draw(this.ctx);

  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
}

GameView.prototype.start = function start () {
  this.bindKeyHandlers();
  this.lastTime = 0;

 requestAnimationFrame(this.animate.bind(this));
}

GameView.MOVES = {
  w: [0, -3],
  a: [-3, 0],
  s: [0, 3],
  d: [3, 0],
};


module.exports = GameView;