const Util = require('./util')
const Bullet = require('./bullet')
const MovingObject = require('./MovingObject')

const DEFAULTS = {
  COLOR: "#E5D51C",
  RADIUS: 10,
  SPEED: 15
}

function Ship(options) {
  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || [0, 0];
  options.game = options.game;

  MovingObject.call(this, options)
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function relocate () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
}

Ship.prototype.power = function power (impulse) {
  this.vel[0] = impulse[0];
  this.vel[1] = impulse[1];
}

Ship.prototype.fireBullet = function fireBullet () {
  const norm = Util.norm(this.vel);

  if (norm === 0) {
    // Can't fire unless moving.
    return;
  }

  const relVel = Util.scale(
    Util.dir(this.vel),
    Bullet.SPEED
  );

  const bulletVel = [
    relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  ];

  const bullet = new Bullet({
    pos: this.pos,
    vel: bulletVel,
    color: this.color,
    game: this.game
  });

  this.game.add(bullet);
}


module.exports = Ship;