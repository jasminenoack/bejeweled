;(function () {

  if (window.Bejeweled === undefined) {
    window.Bejeweled = {}
  }


  Bejeweled.Game = function() {
    this.bricks = this.generateBricks();
  }

  Bejeweled.Game.prototype.generateBricks = function () {
    var bricks = [];
    for (var i = 0; i < Bejeweled.Utils.columns; i++){
      bricks.push([])
      for (var j = 0; j < Bejeweled.Utils.rows; j++) {
        bricks[i].push(Bejeweled.Utils.createBrick())
      }
    }
    return bricks
  }

  Bejeweled.Game.clickEvent = function (x, y) {
    console.log( x, y)
  }








})();
