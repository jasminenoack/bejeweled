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
  this.game = new Bejeweled.Game(this.rows, this.columns, this.$ul)

  this.$ul.on("click", "li", this.handleClick.bind(this));
  this.disabled = false;
}

view.prototype.handleClick = function (event) {
  if (this.disabled) {
    return;
  };
  this.disabled = true;

  var $li = $(event.currentTarget)
  var pos = $li.index()
  var target = this.selected ? this.selected.index() : null

  if (!this.selected) {
    $li.addClass("selected");
    this.selected = $li;
    this.disabled = false;

  } else if (target === pos) {
    this.selected.removeClass("selected");
    this.selected = null
    this.disabled = false;

  } else if (this.selected) {

    if (this.game.validSwitch(target, pos)) {
      this.selected.removeClass("selected");


      Bejeweled.Block.switchColors($li, this.selected, function () {
        inMatch = this.game.findMatches(this.$ul)
        this.selected = null
        this.game.handleMatches(inMatch, function () {
          this.game.cascade( function () {
            this.disabled = false;
            console.log ("disabled", this.disabled)
          }.bind(this))
        }.bind(this))

      }.bind(this))



    } else {
      console.log ("can't move there")
      this.disabled = false;
    }

  }
}

view.prototype.drawBlocks = function () {
  var $li
  for (var i = 0; i < this.rows * this.columns; i++ ) {
    $li = Bejeweled.Block.colorBlock($("<li></li>"))

    this.$ul.append($li);
  };
};

})();
