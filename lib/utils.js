;(function () {

  if (window.Bejeweled === undefined) {
    window.Bejeweled = {}
  }

  window.CanvasUtils = {
    canvas: document.getElementById("canvas"),
    width: canvas.width,
    height: canvas.height,
    ctx: canvas.getContext('2d')
  }

  CanvasUtils.getPosition = function (event) {
    var x = event.x;
    var y = event.y;

    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;

    Bejeweled.Game.clickEvent(game, x, y)
  }



  window.Bejeweled.Utils = {
    xStart: 0,
    yStart: 0,
    height: 663,
    width: 663,
    rows: 8,
    columns: 8,
  }

  Bejeweled.Utils.createBrick = function(pos, game) {
    return new Bejeweled.Brick ((Bejeweled.Brick.COLORS).sample(), pos, game)
  }

  window.Bejeweled.Utils.inherits = function (parent, child){
    function Surrogate () {}
    Surrogate.prototype = parent.prototype
    child.prototype = new Surrogate()
  }

  Array.prototype.sample = function () {
    var length = this.length;
    var i = Math.floor(Math.random() * length);
    return this[i];
  }



})();
