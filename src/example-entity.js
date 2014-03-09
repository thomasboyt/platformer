var ExampleEntity = function(game, settings) {
  this.text = settings.text;
};

ExampleEntity.prototype.draw = function(ctx) {
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.font = "24px sans-serif";
  ctx.fillText(this.text, 250, 250);
};

export default ExampleEntity;
