const Asteroid = require('./asteroid')
const Ship = require('./ship')
const Bullet = require('./bullet')
const Util = require('./util')

function Game () {
  this.asteroids = [];
  this.bullets = [];
  this.ship = new Ship({pos: this.randomPosition(), game: this});

  this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;

Game.prototype.add = function add (object) {
  if (object instanceof Asteroid) {
    this.asteroids.push(object);
  } else if (object instanceof Bullet) {
    this.bullets.push(object);
  } else if (object instanceof Ship) {
    this.ships.push(object);
  } else {
    throw new Error("unknown type of object");
  }
}

Game.prototype.addAsteroids = function addAsteroids() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({ pos: this.randomPosition(), game: this }))
  }
}

Game.prototype.allObjects = function allObjects () {
  return [].concat(this.asteroids, this.bullets, this.ship);
}


Game.prototype.draw = function draw (ctx) {
  ctx.clearRect(0, 0, 1000, 600);

  this.allObjects().forEach(function(object){
    object.draw(ctx);
  });
}

Game.prototype.moveObjects = function moveObjects (delta) {
  this.allObjects().forEach(function(object){
    object.move(delta);
  });
}

Game.prototype.wrap = function wrap (pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
  ]
}

Game.prototype.addAsteroids = function addAsteroids () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({ pos: this.randomPosition(), game: this }))
  }
}


Game.prototype.randomPosition = function randomPosition () {
  return [
    Game.DIM_X * Math.random(),
    Game.DIM_Y * Math.random()
  ];
}

Game.prototype.checkCollisions = function checkCollisions () {
  let allObjects = this.allObjects()
  for(let i = 0; i < allObjects.length; i++) {
    for(let j = i + 1; j < allObjects.length; j++) {
      const obj1 = allObjects[i];
      const obj2 = allObjects[j];
      if (obj1.isCollidedWith(obj2)) {
        // console.log("Hit")
        const collision = obj1.collideWith(obj2);
        if (collision) return;
      }
    }
  }
}

Game.prototype.step = function step (delta) {
  this.moveObjects(delta);
  this.checkCollisions();
}

Game.prototype.remove = function remove (object) {
  if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if (object instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
  };
}

Game.prototype.isOutOfBounds = function isOutOfBounds(pos) {
  return ((pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y));
};

module.exports = Game;
