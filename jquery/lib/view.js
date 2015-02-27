;(function (){

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
}

var view = Bejeweled.View = function (rows, columns, $el) {
  this.$el = $el;
  this.rows = rows;
  this.columns = columns;
  this.drawBlocks();
  this.bindClick();
}

view.prototype.bindClick = function () {
  console.log(this.$el)
  this.$el.click("li", function () {
    console.log(this);
  });
}

view.prototype.drawBlocks = function () {
  var $li
  console.log(this.rows * this.columns)
  for (var i = 0; i < this.rows * this.columns; i++ ) {
    $li = $("<li></li>")
    $li.addClass(Bejeweled.Block.RandomColor());
    this.$el.append($li)
  };
};

})();
