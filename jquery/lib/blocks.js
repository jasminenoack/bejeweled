;(function () {

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
};


var block = Bejeweled.Block = function (color, pos, game) {
  this.pos = pos;
  this.color = color;
  this.game = game;
}

block.COLORS = ["red", "green", "blue", "yellow", "orange", "purple"]

block.create = function (pos, game) {
  var color = block.COLORS[Math.floor(Math.random() * block.COLORS.length)]
  return new block(color, pos, game)
}

})();
