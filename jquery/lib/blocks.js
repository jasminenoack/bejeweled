;(function () {

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
};

var block = Bejeweled.Block = {}

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

block.findColors = function ($ul) {
  var $lis = $ul.find("li");

  var colors = $lis.map(function (index, block) {
    return $(block).data("color")
    // block.data("color")
  });

  return (colors)
};

})();
