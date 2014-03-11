import PlatformController from './platform_controller';
import Player from './player';

// require is used for an out-of-system import
var Coquette = require('coquette');

var Game = function(canvasId, width, height) {
  window.c = new Coquette(this, canvasId, width, height, '#000');

  c.entities.create(PlatformController, {});

  c.entities.create(Player, {
    center: {x: 400, y: 300}
  });
};

new Game('container', 500, 500);
