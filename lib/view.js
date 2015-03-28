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
  this.score = 0
  this.$notification = this.$el.find("notification")
  this.$start = this.$el.find(".start")
  this.$el.on("click", ".shuffle", this.shuffle.bind(this))
  this.$el.on("click", ".start", this.start.bind(this))
  this.$timer = $(".timer")

  this.disabled = false;
  window.view = this
}

view.prototype.timerDraw = function () {
  if (this.time < 0) {
    this.time = 0
  }
  var width = 650 / 60 * this.time
  this.$timer.css("width", width)
}

view.prototype.incrementTime = function () {
  this.time --
  this.timerDraw()

  if (this.time <= 0 && !this.disabled) {
    this.timeEnd()
  }
}

view.prototype.timeEnd = function () {
  clearInterval(this.interval)
  this.$ul.off()
  this.$start.text("start")
  this.$notification.html(
    "The game has ended your final score is " + this.score)
}

view.prototype.start = function (event) {
  if (this.disabled) {
    return;
  };
  this.$ul.off()
  this.selected = null
  this.time = 60
  this.timerDraw()
  this.$ul.on("click", "li", this.handleClick.bind(this));
  event.preventDefault()
  this.disabled = true;
  this.drawBlocks();
  this.checkBoard()
  this.score = 0
  this.$notification.html("")
  this.$start.text("restart")

  this.interval = setInterval(this.incrementTime.bind(this), 1000)
}

view.prototype.checkBoard = function () {
  this.game.isTransitionsEnd($(".board li"), function () {

    var matches = this.game.findMatches();
    this.score += matches.length
    if (matches.length > 0) {
      this.$notification.text("You scored " + matches.length + " points.")
    }

    $(".num-score").text(this.score)

    if (matches.length > 0) {
      this.game.handleMatches(matches, function() {
      this.game.cascade(this.checkBoard.bind(this))
      }.bind(this));
    } else {
      this.disabled = false;
      if (this.game.game_over()) {
        this.$notification.html(
          "There are no more moves. A shuffle will cost 20 points. <button class='shuffle'>Shuffle</button>")
      }
      if (this.time <= 0) {
        this.timeEnd()
      }
    }
  }.bind(this))
}

view.prototype.shuffle = function (event) {
  event.preventDefault()
  this.score = this.score - 20
  this.drawBlocks()
  this.checkBoard()
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
      this.selected.removeClass("selected")
      Bejeweled.Block.switchColors($li, this.selected, this.checkBoard.bind(this))
      this.selected = null

    } else {
      this.disabled = false;
    }
  }

}

view.prototype.drawBlocks = function () {
  this.$ul.empty()
  var $li
  for (var i = 0; i < this.rows * this.columns; i++ ) {
    $li = Bejeweled.Block.colorBlock($("<li></li>"))

    this.$ul.append($li);
  };
};


})();
