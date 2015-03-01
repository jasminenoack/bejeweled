;(function (){

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
}

var view = Bejeweled.View = function (rows, columns, el) {
  this.$el = el;
  this.$ul = this.$el.find(".board")
  this.rows = rows;
  this.columns = columns;
  this.drawBlocks();
  this.selected = null;
  this.game = new Bejeweled.Game(this.rows, this.columns, this.$ul.find("li"))

  this.$ul.on("click", "li", this.handleClick.bind(this));
}

view.prototype.handleClick = function (event) {
  var $li = $(event.currentTarget)
  var pos = $li.index()
  var target = this.selected ? this.selected.index() : null

  if (!target) {
    $li.addClass("selected");
    this.selected = $li;

  } else if (target === pos) {
    this.selected.removeClass("selected");
    this.selected = null

  } else if (this.selected) {

    if (this.game.validSwitch(target, pos)) {
      Bejeweled.Block.switchColors($li, this.selected)

      this.selected.removeClass("selected");
      this.selected = null

      inMatch = this.game.findMatches(this.$ul)
      this.game.handleMatches(inMatch)

      console.log (inMatch)
    } else {
      console.log ("can't move there")
    }

  }
}

view.prototype.drawBlocks = function () {
  var $li
  for (var i = 0; i < this.rows * this.columns; i++ ) {
    $li = $("<li></li>")
    var color = Bejeweled.Block.RandomColor();

    $li.addClass(color);
    $li.data("color", color);

    this.$ul.append($li);
  };
};

})();
