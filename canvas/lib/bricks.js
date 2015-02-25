;(function () {

  if (window.Bejeweled === undefined) {
    window.Bejeweled = {}
  }

  Bejeweled.Brick = function (color, pos, game) {
    this.color = color;
    this.dimension = 80;
    this.pos = pos;
    this.game = game;
  }

  Bejeweled.Brick.prototype.range = function () {
    xStart = 1 + (this.dimension + 3) * this.pos[1]
    xEnd = xStart + this.dimension

    yStart = 1 + (this.dimension + 3) * this.pos[0]
    yEnd = yStart + this.dimension
    return {xStart: xStart, xEnd: xEnd, yStart: yStart, yEnd: yEnd}
  }

  Bejeweled.Brick.find = function (x, y) {
    x -= 1
    y -= 1
    if (x % 83 < 1 || x % 83 > 80 || y % 83 < 1 || y % 83 > 80) {
      return  false
    } else {
      return this.game.bricks[Math.floor(x/83)][Math.floor(y/83)]
    }
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
