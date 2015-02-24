;(function () {

  if (window.Bejeweled === undefined) {
    window.Bejeweled = {}
  }

  window.Bejeweled.canvasLoad = {}





  window.Bejeweled.canvasLoad.background = function () {
    this.clearRect

    var ctx = CanvasUtils.ctx;
    var width = CanvasUtils.width;
    var height = CanvasUtils.height;

    // ctx.fillStyle = "black"
    // ctx.fillRect(0, 0, 266, height);
    // ctx.fillRect(597, 0, 203, height);
    // ctx.fillRect(0, 0, width, 73);
    // ctx.fillRect(0, height - 32, width, 32);

    // ctx.fillStyle = "DarkBlue"
    // ctx.fillRect(
    //   Bejeweled.Utils.xStart,
    //   Bejeweled.Utils.yStart,
    //   Bejeweled.Utils.width,
    //   Bejeweled.Utils.height);
  }

  window.Bejeweled.canvasLoad.clear = function () {
    clearRect(0,0,width,height)
  }

})();
