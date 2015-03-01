;(function () {

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
};

var block = Bejeweled.Block = function (color, pos, game) {
  this.pos = pos;
  this.color = color;
  this.game = game;
}

block.COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "white", "black"]

block.RandomColor = function () {
  return block.COLORS[Math.floor(Math.random() * 8)]
}

block.switchColors = function ($li1, $li2) {
  var color1 = $li1.data("color")
  var color2 = $li2.data("color")

  $li1.removeClass(color1).addClass(color2);
  $li1.data("color", color2);
  $li2.removeClass(color2).addClass(color1);
  $li2.data("color", color1);
}

})();
