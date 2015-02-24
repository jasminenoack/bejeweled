;(function () {

  if (window.Bejeweled === undefined) {
    window.Bejeweled = {}
  }

  Bejeweled.Brick = function (color) {
    this.color = color;
    this.dimension = 80;
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
