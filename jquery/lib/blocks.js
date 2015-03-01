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
  var class1 = $li1.attr("class")
  var class2 = $li2.attr("class")

  $li1.removeClass(class1).addClass(class2);
  $li1.data("color", class2);
  $li2.removeClass(class2).addClass(class1);
  $li2.data("color", class1);
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
