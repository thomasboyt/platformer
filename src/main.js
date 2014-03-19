var Coquette = require('coquette');

// require is used for an out-of-system import
var c = new Coquette(this, 'container', 500, 500, '#000');
export default c;

import PlatformController from './platform_controller';
import Player from './player';

export function init() {
  c.entities.create(PlatformController, {});

  c.entities.create(Player, {
    center: {x: 400, y: 250}
  });

  // throw some constants on c. some day these could be exported by this module,
  // but circular deps :(
  c.WIDTH = 500;
  c.HEIGHT = 500;
}
