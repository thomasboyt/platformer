import Platform from './platform';

import {sidesForEntity, rectangleIntersection} from './util';

var Maths = require('coquette').Collider.Maths;

var Player = function(game, settings) {
  this.size = {x: 20, y: 20};
  this.boundingBox = c.collider.RECTANGLE;
  this.angle = 0;

  for (var key in settings) {
    this[key] = settings[key];
  }

  this.vx = 0;
  this.vy = 0;
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
  var MOVE_SPEED = 10;

  var step = dt/100;

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
        this.grounded = true;
      } else {
        this.center.y += intersect.h;
      }
      this.vy = 0;
    } else {
      if (intersect.fromLeft) {
        this.center.x -= intersect.w;
      } else {
        this.center.x += intersect.w;
      }
      this.vx = 0;
    }

    /*
     * If the intersection of the two rects is wider than it is deep, you’ll assume that the correct resolution in this case is vertical. If the intersecting rect is taller than it is wide, you’ll resolve it horizontally.
     */

    /*var xdiff = 0;
    var ydiff = (other.center.y - other.size.y / 2) - (this.center.y + this.size.y / 2);
    if (this.vx < 0) {
      xdiff = (other.center.x + (other.size.x /2)) - (this.center.x - (this.size.x / 2));
    } else if (this.vx > 0) {
      xdiff = (other.center.x - (other.size.x /2)) - (this.center.x + (this.size.x / 2));
    }

    var solved;
    while (!solved)
        if (ydiff < 0 && this.vy >= 0) {  // allow one-way movement thru
          this.center.y += ydiff;
          this.grounded = true;
          }*/

    // this is dumb v
    //var xdiff = (other.center.x + other.size.x / 2) - (this.center.x + this.size.x / 2);
    /*var ydiff = (other.center.y - other.size.y / 2) - (this.center.y + this.size.y / 2);

    var otherEdge, thisEdge;
    if (this.vx !== 0) {
      if (this.vx > 0) {
        // walking right, so care about left edge
        otherEdge = other.center.x - other.size.x / 2;
        thisEdge = this.center.x - this.size.x / 2;
      } else if (this.vx < 0) {
        // walking left, so care about right edge
        otherEdge = other.center.x + other.size.x / 2;
        thisEdge = this.center.x + this.size.x / 2;
      }
      var xdiff = otherEdge - thisEdge;
      if (!this.grounded) {
        console.log(xdiff);
      }
    }


    if (ydiff < 0 && this.vy >= 0) {  // allow one-way movement thru
      this.vy = 0;
      this.center.y += ydiff;
      this.grounded = true;
    }

    //if (Math.abs(ydiff) < Math.abs(xdiff)) {
      
      /*} else {
      this.vx = 0;
      this.center.x += xdiff;
      }*/
  }
};

export default Player;
