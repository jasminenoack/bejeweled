;(function (){

if (window.Bejeweled === undefined) {
  window.Bejeweled = {};
}

var setup = Bejeweled.setup = function () {
  this.game = new Bejeweled.Game;
  this.selected = undefined;
}

var draw = setup.prototype.draw = function () {
  var blocks = this.game.blocks
  var board = $(".bejeweled")

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var block = blocks[i][j]
      var id = block.id()
      var color = block.color
      var $block = $("<block></block>");

      $block.css("background", block.color);
      $block.attr("id", id);

      $block.click(setup.handleClick.bind(this));

      board.append($block);
    }
  }
}

setup.handleClick = function (event) {
  var game = this.game;
  var $block = $(event.target);
  var id = $block.attr('id')
  var block = game.blocks[id[0]][id[1]]

  if (this.selected === undefined) {
    this.select($block, block);
  } else if (
    this.selected[1].pos[0] === block.pos[0] &&
    this.selected[1].pos[1] === block.pos[1]
  ) {
    this.unselect($block, block);
  } else {
    block.switch(this.selected[1])
    this.unselect.apply(this, this.selected)

    var board = $(".bejeweled")
    board.empty()
    this.draw()
  }

  // console.log(this.selected)
}

setup.prototype.select = function ($block, block) {
  this.selected = [$block, block];
  $block.addClass("selected")
}

setup.prototype.unselect = function ($block, block) {
  $block.removeClass("selected")
  this.selected = undefined;
}

var play = new setup()
// console.log (play.game)
play.draw()

})();
