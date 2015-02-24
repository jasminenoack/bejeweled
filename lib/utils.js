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



  window.Bejeweled.Utils = {
    xStart: 267,
    yStart: 74,
    height: 501,
    width: 341,
    rows: 12,
    columns: 8,
  }

  Bejeweled.Utils.createBrick = function(color) {
    return new Bejeweled.Brick ((Bejeweled.Brick.COLORS).sample())
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
