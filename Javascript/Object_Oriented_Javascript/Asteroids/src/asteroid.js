const Util = require('./util')
const MovingObject = require('./MovingObject')
const Ship = require('./ship')
const Bullet = require('./bullet')

const DEFAULTS = {
  COLOR: "#9DB0D6",
  RADIUS: 15,
  SPEED: 4
}

function Asteroid (options) {
  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
  options.game = options.game;
    
  MovingObject.call(this, options)
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function collideWith(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
    return true;
  } else if (otherObject instanceof Bullet) {
    this.game.remove(this);
    this.game.remove(otherObject);
    return true;
  }
  return false;
}


module.exports = Asteroid;