const Util = require('./util')
const MovingObject = require('./MovingObject')


function Bullet(options) {
  options.radius = Bullet.RADIUS;

  MovingObject.call(this, options);
}

Bullet.RADIUS = 2;
Bullet.SPEED = 5;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;


module.exports = Bullet;