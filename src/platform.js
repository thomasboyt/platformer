import c from './main';

var Platform = function(game, settings) {
  this.boundingBox = c.collider.RECTANGLE;
  this.angle = 0;
  for (var key in settings) {
    this[key] = settings[key];
  }
};

Platform.prototype.draw = function(ctx) {
  ctx.fillStyle = 'white';
  var x = this.center.x - this.size.x / 2;
  var y = this.center.y - this.size.y / 2;
  ctx.fillRect(x, y, this.size.x, this.size.y);
};

export default Platform;
