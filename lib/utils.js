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

  window.Bejeweled.Utils = {}

  window.Bejeweled.Utils.inherits = function (parent, child){
    function Surrogate () {}
    Surrogate.prototype = parent.prototype
    child.prototype = new Surrogate()
  }



})();
