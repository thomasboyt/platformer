import Platform from './platform';

var PlatformController = function(game, settings) {
  this.scrollSpeed = 2;

  this.platforms = [];

  // starting platforms
  this.platforms = [

    // solid ground
    c.entities.create(Platform, {
      center: {x: 250, y: 400},
      size: {x: 500, y: 200}
    }),

    // ledge w/ hole

    c.entities.create(Platform, {
      center: {x: 100, y: 200},
      size: {x: 200, y: 25}
    }),

    c.entities.create(Platform, {
      center: {x: 400, y: 200},
      size: {x: 200, y: 25}
    }),

    c.entities.create(Platform, {
      center: {x: 100, y: 100},
      size: {x: 200, y: 25}
    }),

    c.entities.create(Platform, {
      center: {x: 400, y: 100},
      size: {x: 200, y: 25}
    }),

  ];
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
    }
  }

};

export default PlatformController;
