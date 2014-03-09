import Platform from './platform';
import Player from './player';

// require is used for an out-of-system import
var Coquette = require('coquette');

var Game = function(canvasId, width, height) {
  window.c = new Coquette(this, canvasId, width, height, '#000');

  c.entities.create(Platform, {
    center: {x: 250, y: 475},
    size: {x: 500, y: 25}
  });

  c.entities.create(Platform, {
    center: {x: 125, y: 400},
    size: {x: 150, y: 25}
  });

  c.entities.create(Platform, {
    center: {x: 375, y: 400},
    size: {x: 150, y: 25}
  });

  c.entities.create(Platform, {
    center: {x: 375, y: 400},
    size: {x: 25, y: 150}
  });

  c.entities.create(Player, {
    center: {x: 400, y: 300}
  });

};

new Game('container', 500, 500);
