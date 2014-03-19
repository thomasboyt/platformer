import Platform from './platform';
import PlatformController from './platform_controller';
import c from './main';

import {rectangleIntersection} from './util';

var Maths = require('coquette').Collider.Maths;

var Player = function(game, settings) {
  this.platformController = c.entities.all(PlatformController)[0];

  this.size = {x: 20, y: 20};
  this.boundingBox = c.collider.RECTANGLE;
  this.angle = 0;

  for (var key in settings) {
    this[key] = settings[key];
  }

  this.vx = 0;
  this.vy = this.platformController.scrollSpeed;
};

Player.prototype.draw = function(ctx) {
  ctx.fillStyle = 'red';
  var x = this.center.x - this.size.x / 2;
  var y = this.center.y - this.size.y / 2;
  ctx.fillRect(x, y, this.size.x, this.size.y);
};

Player.prototype.update = function(dt) {
  var GRAVITY_ACCEL = 4;
  var JUMP_VEL = -30;
  var MOVE_SPEED = 15;

  var step = dt/100;

  // TODO: edge case where speed == scroll speed but you're not actually grounded
  // this could be replaced w/ a few different things
  if (this.vy !== this.platformController.scrollSpeed) {
    this.grounded = false;
  }

  if (c.inputter.isPressed(c.inputter.SPACE) && this.grounded) {
    this.vy = JUMP_VEL;
    this.grounded = false;
  }

  this.vx = 0;
  if (c.inputter.isDown(c.inputter.LEFT_ARROW)) {
    this.vx = -MOVE_SPEED;
  }
  if (c.inputter.isDown(c.inputter.RIGHT_ARROW)) {
    this.vx = MOVE_SPEED;
  }

  // Apply acceleration vector to our velocity
  this.vy += GRAVITY_ACCEL * step;

  // Apply velocity to position
  this.center.x += this.vx * step;
  this.center.y += this.vy * step;
};

Player.prototype.collision = function(other, type) {
  if (other instanceof Platform) {
    var intersect = rectangleIntersection(this, other);

    if (intersect.w > intersect.h) {
      // do y correction
      if (intersect.fromAbove) {
        this.center.y -= intersect.h;

        // prevent "sticky corners" while ascending
        if (this.vy > 0) {
          this.grounded = true;
          this.vy = this.platformController.scrollSpeed;
        }
      } else {
        this.center.y += Math.ceil(intersect.h);
        this.vy = this.platformController.scrollSpeed;
      }
    } else {
      // do x correction
      if (intersect.fromLeft) {
        this.center.x -= intersect.w;
      } else {
        this.center.x += intersect.w;
      }
      this.vx = 0;
    }
  }
};

export default Player;
