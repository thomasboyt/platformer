import Platform from './platform';
import c from './main';

var PlatformController = function(game, settings) {
  this.scrollSpeed = 5;

  this.platforms = [];

  this.platformHeight = 25;

  // starting platforms
  this.platforms = [

    c.entities.create(Platform, {
      center: {x: 250, y: 400 + this.platformHeight / 2},
      size: {x: 500, y: this.platformHeight}
    }),

    c.entities.create(Platform, {
      center: {x: 250, y: 300 + this.platformHeight / 2},
      size: {x: 500, y: this.platformHeight}
    })
  ];

  [0, 100, 200, 300].forEach(function(y) {
    this.generatePlatform(y + this.platformHeight / 2);
  }.bind(this));
};

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

PlatformController.prototype.generatePlatform = function(y) {
  var height = this.platformHeight;

  var centerY;
  if (y !== undefined) { centerY = y; }
  else { centerY = 0 - (height / 2); }

  // types of platforms:
  // hole       |========   ======|
  // left edge  |===              |
  // right edge |              ===|
  // center     |     =======     |

  var types = {HOLE: 0, LEFT_EDGE: 1, RIGHT_EDGE: 2, CENTER: 3};

  var type = getRandomInt(0, 3);

  var platforms;
  var width;

  /*
   * TODO: Logic to make sure you can always jump up: prevent "overhangs"
   *
   *   ===
   *
   * === ====
   *
   * ====== =
   *
   * ===   ==
   *
   * ========
   *
   * Make sure the area under the "empty part" of a row has at least the edge of another platform
   * TODO: can this be abstracted?
   *
   * so, when creating a new platform, look at the "hole" or whatever part of the row has no platform,
   * 
   */

  // TODO: this could be prettier, probably
  if (type === types.HOLE) {
    width = getRandomInt(50, 450);
    platforms = [
      c.entities.create(Platform, {
        center: {x: (500 - width) / 4 , y: centerY},
        size: {x: (500 - width) / 2,  y: height}
      }),
      c.entities.create(Platform, {
        center: {x: 500 - (500 - width) / 4, y: centerY},
        size: {x: (500 - width) / 2, y: height}
      }),
    ];
  } else if (type === types.LEFT_EDGE) {
    width = getRandomInt(50, 450);
    platforms = [
      c.entities.create(Platform, {
        center: {x: width / 2, y: centerY},
        size: {x: width, y: height}
      })
    ];
  } else if (type === types.RIGHT_EDGE) {
    width = getRandomInt(50, 450);
    platforms = [
      c.entities.create(Platform, {
        center: {x: 500 - (width / 2), y: centerY},
        size: {x: width, y: height}
      })
    ];
  } else if (type === types.CENTER) {
    width = getRandomInt(50, 450);
    platforms = [
      c.entities.create(Platform, {
        center: {x: 250, y: centerY},
        size: {x: width, y: height}
      })
    ];
  }

  this.platforms = this.platforms.concat(platforms);
};

PlatformController.prototype.update = function(dt) {
  var step = dt/100;

  // move all platforms down
  // (reverse order because we're mutatting as we go)
  for (var i = this.platforms.length - 1; i >= 0; i--) {
    var platform = this.platforms[i];
    platform.center.y += this.scrollSpeed * step;

    var top = platform.center.y - platform.size.y / 2;
    if (top > 500) {
      c.entities.destroy(platform);
      this.platforms.splice(i, 1);

      this.generatePlatform();
    }
  }

};

export default PlatformController;
