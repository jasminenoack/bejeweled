;(function () {

  if (window.Bejeweled === undefined) {
    window.Bejeweled = {}
  }

  Bejeweled.Draw = {}

  Bejeweled.Draw.rect = function (x, y, w, h, color) {
    var ctx = CanvasUtils.ctx;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.strokeStyle="black";
    ctx.stroke();
  }
  
  Bejeweled.Draw.bricks = function (game) {
    var bricks = game.bricks;
    var xStart = Bejeweled.Utils.xStart + 1;
    var yStart = Bejeweled.Utils.yStart + 1;

    for ( var i = 0; i < bricks.length; i++) {
      for ( var j = 0; j < bricks[0].length; j++) {
        var brick = bricks[i][j]
        this.rect(
          xStart + (brick.dimension + 3) * i,
          yStart + (brick.dimension + 3) * j,
          brick.dimension,
          brick.dimension,
          brick.color
        )
      }
    }
  }















})();
