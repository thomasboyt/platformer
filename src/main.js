import PlatformController from './platform_controller';
import Player from './player';
var Coquette = require('coquette');

export var WIDTH = 500, HEIGHT = 500;

// require is used for an out-of-system import
var c = new Coquette(this, 'container', WIDTH, HEIGHT, '#000');

export function init() {
  c.entities.create(PlatformController, {});

  c.entities.create(Player, {
    center: {x: 400, y: 250}
  });
}

export default c;
