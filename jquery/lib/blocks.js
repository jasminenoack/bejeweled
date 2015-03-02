;(function () {

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
};

var block = Bejeweled.Block = {}

block.COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "white", "black" ]

block.RandomColor = function () {
  return block.COLORS[Math.floor(Math.random() * block.COLORS.length)]
}

block.switchColors = function ($li1, $li2, callback) {
  var class1 = $li1.attr("class")
  var color1 = $li1.data("color")
  var class2 = $li2.attr("class")
  var color2 = $li2.data("color")
  $li1.data("transitioning", true)
  $li2.data("transitioning", true)
  var pos1 = $li1.index()
  var pos2 = $li2.index()

  if (Math.abs(pos1 - pos2) === 1) {
    if (pos1 - pos2 === 1) {
      $li2.addClass("to-right");
      $li1.addClass("to-left");
    } else {
      $li1.addClass("to-right");
      $li2.addClass("to-left");
    }

  } else {
    if (pos1 - pos2 === 8) {
      $li2.addClass("to-bottom");
      $li1.addClass("to-top");
      } else {
      $li1.addClass("to-bottom");
      $li2.addClass("to-top");
    }
  }

  $li1.one("transitionend", function (event) {
    $li1.removeClass().addClass(class2);
    $li1.data("color", color2)
    $li2.removeClass().addClass(class1);
    $li2.data("color", color1)
    $li1.data("transitioning", false)
    $li2.data("transitioning", false)
    if (callback) {
      callback()
    }
  });
}

block.findColors = function ($ul) {
  var $lis = $ul.find("li");

  var colors = $lis.map(function (index, block) {
    return $(block).data("color")
    // block.data("color")
  });

  return (colors)
};

block.colorBlock = function ($li) {

  var color = Bejeweled.Block.RandomColor();


  $li.addClass(color);
  $li.data("color", color);
  $li.data("transitioning", false);
  return $li
}



})();
