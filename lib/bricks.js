;(function () {

  if (window.Bejeweled === undefined) {
    window.Bejeweled = {}
  }

  Bejeweled.Brick = function (color) {
    this.color = color;
    this.dimension = 40;
  }

  Bejeweled.Brick.COLORS = [
    "yellow",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ]



})();
