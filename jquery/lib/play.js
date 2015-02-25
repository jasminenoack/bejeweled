;(function (){

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
}

var setup = Bejeweled.setup = function () {
  this.game = new Bejeweled.Game;
}

var draw = setup.prototype.draw = function () {
  var blocks = this.game.blocks
  var board = $(".bejeweled")
  console.log(board)

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var block = blocks[i][j]
      var $block = $("<block></block>");

      $block.css("background", block.color)
      $block.css("display", "block")
      $block.css("float", "left")
      $block.css("height", "60px")
      $block.css("width", "60px")
      $block.css("border-radius", "5px")
      $block.css("border", "1px solid black")
      $block.addClass(" " + block.pos[0] + block.pos[1])
      $block.css("margin", "1px")
      $block.click(setup.handleClick.bind(this))

      board.append($block);
    }
  }
}

setup.handleClick = function (event) {
  var game = this.game;
  var block = $(event.target);

  console.log (block)
}




var play = new setup()
console.log (play.game)
play.draw()

})();
