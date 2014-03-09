import ExampleEntity from "./example-entity";

// require is used for an out-of-system import
var Coquette = require('coquette');

var Game = function(canvasId, width, height) {
  window.coq = new Coquette(this, canvasId, width, height, "#000");

  coq.entities.create(ExampleEntity, {
    text: "Hello world!"
  });
};

new Game("container", 500, 500);
