;(function (){

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
}

var view = Bejeweled.View = function (rows, columns, $el) {
  this.$el = $el;
  this.rows = rows;
  this.columns = columns;
  this.drawBlocks();
}

view.prototype.drawBlocks = function () {
  var $li
  for (var i = 0; i < this.rows * this.columns; i++ ) {
    $li = $("<li><li>")
    $li.addClass(Bejeweled.Block.RandomColor());
    this.$el.append($li)
  };
};


})();
