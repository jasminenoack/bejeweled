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
  this.selected = null

  console.log(this.$ul instanceof jQuery)
  this.$ul.on("click", "li", this.handleClick.bind(this));
}

view.prototype.handleClick = function (event) {
  var $li = $(event.currentTarget)

  if (!this.selected) {
    $li.addClass("selected");
    this.selected = $li;

  } else if (this.selected.index() === $li.index()) {
    this.selected.removeClass("selected");
    this.selected = null

  } else if (this.selected) {
    Bejeweled.Block.switchColors($li, this.selected)

    console.log(this.selected)
    this.selected.removeClass("selected");
    this.selected = null
  }
}

view.prototype.drawBlocks = function () {
  var $li
  console.log(this.rows * this.columns)
  for (var i = 0; i < this.rows * this.columns; i++ ) {
    $li = $("<li></li>")
    var color = Bejeweled.Block.RandomColor();

    $li.addClass(color);
    $li.data("color", color);

    this.$ul.append($li);
  };
};

})();
