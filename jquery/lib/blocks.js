;(function () {

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
};

var block = Bejeweled.Block = function (color, pos, game) {
  this.pos = pos;
  this.color = color;
  this.game = game;
}

block.COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "white", "black"]

block.RandomColor = function () {
  return block.COLORS[Math.floor(Math.random() * 8)]
}

// block.create = function (pos, game) {
//   var color = block.COLORS[Math.floor(Math.random() * block.COLORS.length)]
//   return new block(color, pos, game)
// }
//
// block.prototype.id = function (){
//   // console.log(this)
//   return (" " + this.pos[0] + this.pos[1]).substring(1)
// }
//
// block.prototype.switch = function (otherBlock) {
//   start = this.pos;
//   end = otherBlock.pos;
//
//   var temp = this;
//   this.game.blocks[start[0]][start[1]] = otherBlock;
//   otherBlock.pos = start
//
//   this.game.blocks[end[0]][end[1]] = temp;
//   this.pos = end
// }
//
})();
