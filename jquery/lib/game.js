;(function (){

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
}

var game = Bejeweled.Game = function () {
  this.blocks = this.generateblocks()
}

game.prototype.generateblocks = function () {
  var blocks = []

  for (var i = 0; i < 8; i++) {
    blocks.push([])
    for (var j = 0; j < 8; j++) {
      blocks[i].push(Bejeweled.Block.create([i, j], this))
    }
  }
  return blocks
}




})();
