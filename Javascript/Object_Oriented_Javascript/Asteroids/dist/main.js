/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/GameView.js":
/*!*************************!*\
  !*** ./src/GameView.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\n\nfunction GameView (game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n  this.ship = game.ship;\n}\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers () {\n  const ship = this.ship;\n\n  Object.keys(GameView.MOVES).forEach(function(k){\n    const move = GameView.MOVES[k];\n    key(k, function(){ ship.power(move)})\n  })\n\n  key(\"space\", function () { ship.fireBullet(); });\n}\n\nGameView.prototype.animate = function animate (time) {\n  const timeDelta = time - this.lastTime;\n  \n  this.game.step(timeDelta);\n  this.game.draw(this.ctx);\n\n  this.lastTime = time;\n\n  requestAnimationFrame(this.animate.bind(this));\n}\n\nGameView.prototype.start = function start () {\n  this.bindKeyHandlers();\n  this.lastTime = 0;\n\n requestAnimationFrame(this.animate.bind(this));\n}\n\nGameView.MOVES = {\n  w: [0, -3],\n  a: [-3, 0],\n  s: [0, 3],\n  d: [3, 0],\n};\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/GameView.js?");

/***/ }),

/***/ "./src/MovingObject.js":
/*!*****************************!*\
  !*** ./src/MovingObject.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\")\n\nfunction MovingObject (options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.isWrappable = true;\n\nMovingObject.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color;\n\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n  ctx.stroke();\n  \n  ctx.fill();\n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\nMovingObject.prototype.move = function move(timeDelta) {\n\n  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n    offsetX = this.vel[0] * velocityScale,\n    offsetY = this.vel[1] * velocityScale;\n \n  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n\n  if (this.game.isOutOfBounds(this.pos)) {\n    if (this.isWrappable) {\n      this.pos = this.game.wrap(this.pos);\n    } else {\n      this.game.remove(this);\n    }\n  }\n}\n\nMovingObject.prototype.isCollidedWith = function isCollidedWith (item) {\n  const centerDist = Util.dist(this.pos, item.pos)\n  return centerDist < (this.radius + item.radius);\n}\n\nMovingObject.prototype.collideWith = function collideWith (otherObject) {\n\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/MovingObject.js?");

/***/ }),

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\")\nconst MovingObject = __webpack_require__(/*! ./MovingObject */ \"./src/MovingObject.js\")\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\")\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\")\n\nconst DEFAULTS = {\n  COLOR: \"#9DB0D6\",\n  RADIUS: 15,\n  SPEED: 4\n}\n\nfunction Asteroid (options) {\n  options = options || {};\n  options.color = DEFAULTS.COLOR;\n  options.pos = options.pos || options.game.randomPosition();\n  options.radius = DEFAULTS.RADIUS;\n  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n  options.game = options.game;\n    \n  MovingObject.call(this, options)\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function collideWith(otherObject) {\n  if (otherObject instanceof Ship) {\n    otherObject.relocate();\n    return true;\n  } else if (otherObject instanceof Bullet) {\n    this.game.remove(this);\n    this.game.remove(otherObject);\n    return true;\n  }\n  return false;\n}\n\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\")\nconst MovingObject = __webpack_require__(/*! ./MovingObject */ \"./src/MovingObject.js\")\n\n\nfunction Bullet(options) {\n  options.radius = Bullet.RADIUS;\n\n  MovingObject.call(this, options);\n}\n\nBullet.RADIUS = 2;\nBullet.SPEED = 5;\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.isWrappable = false;\n\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\")\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\")\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\")\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\")\n\nfunction Game () {\n  this.asteroids = [];\n  this.bullets = [];\n  this.ship = new Ship({pos: this.randomPosition(), game: this});\n\n  this.addAsteroids();\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 10;\n\nGame.prototype.add = function add (object) {\n  if (object instanceof Asteroid) {\n    this.asteroids.push(object);\n  } else if (object instanceof Bullet) {\n    this.bullets.push(object);\n  } else if (object instanceof Ship) {\n    this.ships.push(object);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n}\n\nGame.prototype.addAsteroids = function addAsteroids() {\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    this.asteroids.push(new Asteroid({ pos: this.randomPosition(), game: this }))\n  }\n}\n\nGame.prototype.allObjects = function allObjects () {\n  return [].concat(this.asteroids, this.bullets, this.ship);\n}\n\n\nGame.prototype.draw = function draw (ctx) {\n  ctx.clearRect(0, 0, 1000, 600);\n\n  this.allObjects().forEach(function(object){\n    object.draw(ctx);\n  });\n}\n\nGame.prototype.moveObjects = function moveObjects (delta) {\n  this.allObjects().forEach(function(object){\n    object.move(delta);\n  });\n}\n\nGame.prototype.wrap = function wrap (pos) {\n  return [\n    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n  ]\n}\n\nGame.prototype.addAsteroids = function addAsteroids () {\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    this.asteroids.push(new Asteroid({ pos: this.randomPosition(), game: this }))\n  }\n}\n\n\nGame.prototype.randomPosition = function randomPosition () {\n  return [\n    Game.DIM_X * Math.random(),\n    Game.DIM_Y * Math.random()\n  ];\n}\n\nGame.prototype.checkCollisions = function checkCollisions () {\n  let allObjects = this.allObjects()\n  for(let i = 0; i < allObjects.length; i++) {\n    for(let j = i + 1; j < allObjects.length; j++) {\n      const obj1 = allObjects[i];\n      const obj2 = allObjects[j];\n      if (obj1.isCollidedWith(obj2)) {\n        // console.log(\"Hit\")\n        const collision = obj1.collideWith(obj2);\n        if (collision) return;\n      }\n    }\n  }\n}\n\nGame.prototype.step = function step (delta) {\n  this.moveObjects(delta);\n  this.checkCollisions();\n}\n\nGame.prototype.remove = function remove (object) {\n  if (object instanceof Bullet) {\n    this.bullets.splice(this.bullets.indexOf(object), 1);\n  } else if (object instanceof Asteroid) {\n    this.asteroids.splice(this.asteroids.indexOf(object), 1);\n  };\n}\n\nGame.prototype.isOutOfBounds = function isOutOfBounds(pos) {\n  return ((pos[0] < 0) || (pos[1] < 0) ||\n    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y));\n};\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\")\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\")\nconst MovingObject = __webpack_require__(/*! ./MovingObject */ \"./src/MovingObject.js\")\n\nconst DEFAULTS = {\n  COLOR: \"#E5D51C\",\n  RADIUS: 10,\n  SPEED: 15\n}\n\nfunction Ship(options) {\n  options = options || {};\n  options.color = DEFAULTS.COLOR;\n  options.pos = options.pos || options.game.randomPosition();\n  options.radius = DEFAULTS.RADIUS;\n  options.vel = options.vel || [0, 0];\n  options.game = options.game;\n\n  MovingObject.call(this, options)\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function relocate () {\n  this.pos = this.game.randomPosition();\n  this.vel = [0, 0];\n}\n\nShip.prototype.power = function power (impulse) {\n  this.vel[0] = impulse[0];\n  this.vel[1] = impulse[1];\n}\n\nShip.prototype.fireBullet = function fireBullet () {\n  const norm = Util.norm(this.vel);\n\n  if (norm === 0) {\n    // Can't fire unless moving.\n    return;\n  }\n\n  const relVel = Util.scale(\n    Util.dir(this.vel),\n    Bullet.SPEED\n  );\n\n  const bulletVel = [\n    relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n  ];\n\n  const bullet = new Bullet({\n    pos: this.pos,\n    vel: bulletVel,\n    color: this.color,\n    game: this.game\n  });\n\n  this.game.add(bullet);\n}\n\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  inherits (childClass, parentClass) {\n    var Surrogate = function () {};\n    Surrogate.prototype = parentClass.prototype;\n    childClass.prototype = new Surrogate()\n    childClass.prototype.constructor = childClass;\n  },\n  \n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  \n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  },\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("const GameView = __webpack_require__(/*! ./GameView */ \"./src/GameView.js\")\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\nwindow.Game = Game;\nwindow.GameView = GameView;\n\n\nwindow.addEventListener(\"DOMContentLoaded\", function(){\n  const canvasEl = document.getElementById(\"game-canvas\");\n  const ctx = canvasEl.getContext(\"2d\");\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n\n  const g = new Game();\n  new GameView(g, ctx).start(); \n});\n\n//# sourceURL=webpack:///./src/index.js?");
})();

/******/ })()
;