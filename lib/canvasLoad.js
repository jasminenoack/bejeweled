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

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width/4, height);
    ctx.fillRect(width/4*3, 0, width/4, height);

    ctx.fillStyle = "DarkBlue"
    ctx.fillRect(width/4*1, 0, width/4*2, height);

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, 60)
    ctx.fillRect(0, height - 25, width, 25)
  }

  window.Bejeweled.canvasLoad.clear = function () {
    clearRect(0,0,width,height)
  }

})();
