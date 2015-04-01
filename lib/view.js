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
  this.highScore = 0

  this.disabled = false;
  window.view = this
}

view.prototype.timerDraw = function () {
  if (this.time < 0) {
    this.time = 0
  }
  var width = 100 / 30 * this.time
  this.$timer.css("width", width + "%")
}

view.prototype.incrementTime = function () {
  this.time = this.time - 0.1
  this.timerDraw()

  if (this.time <= 0 && !this.disabled) {
    this.timeEnd()
  }
}

view.prototype.timeEnd = function () {
  clearInterval(this.interval)
  this.interval = null
  this.$ul.off()
  this.$start.text("start")
  this.$notification.html(
    "The game has ended your final score is " + this.score)
  this.setHighScore()
  this.$ul.find("li").draggable("disable")
  this.$ul.find("li").droppable("disable")

}

view.prototype.setHighScore = function () {
  if (this.highScore < this.score) {
    $(".high").text("High Score: " + this.score)
    this.highScore = this.score
  }
}

view.prototype.start = function (event) {  
  if (this.disabled) {
    return;
  };

  this.setHighScore()
  this.turns = 0
  this.$ul.off()
  this.selected = null
  this.time = 30
  this.timerDraw()
  this.drawBlocks();
  this.dragDrop()
  this.$ul.on("click", "li", this.handleClick.bind(this));
  event.preventDefault()
  this.disabled = true;
  this.$ul.find("li").draggable("disable")
  this.checkBoard()
  this.score = 0
  this.$notification.html("")
  this.$start.text("restart")
}

view.prototype.createInterval = function () {
  this.interval = setInterval(this.incrementTime.bind(this), 100)
}

view.prototype.dragDrop = function () {
  var offset = this.$ul.position()
  this.$ul.children().each(function (index, li) {
    var pos = $(li).position()
    pos.left = pos.left + offset.left
    pos.top = pos.top + offset.top

    $(li).draggable({
      containment: [
        pos.left - 54,
        pos.top - 54,
        pos.left + 54,
        pos.top + 54
      ],
      start: function () {
        if (this.selected) {
          this.selected.removeClass("selected")
          this.selected = null
        }
      }.bind(this),
      stop: function (event, ui) {
        $(event.target).removeAttr("style")
        if (!that.disabled) {
          that.disabled = true
          if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
          }
          this.checkBoard()
        }
      }.bind(this),
      revert: true,
      addClasses: false,
      revertDuration: 100,
      zIndex: 5,
    })

    var that = this
    $(li).droppable({
      drop: function (event, ui) {
        if (that.disabled) {
          return
        }
        if (that.game.validSwitch(ui.draggable.index(), $(this).index())) {
          that.$ul.find("li").draggable("disable")
          that.turns ++
          Bejeweled.Block.onlySwitchColors(ui.draggable, $(this))
        }
      },
      addClasses: false,
    })
  }.bind(this))
}

view.prototype.checkBoard = function () {
  this.game.isTransitionsEnd($(".board li"), function () {

    var matches = this.game.findMatches();
    this.score += matches.length
    this.timeBonus(matches.length)
    if (matches.length > 0) {
      this.$notification.text("You scored " + matches.length + " points.")
    }

    $(".num-score").text(this.score)

    if (matches.length > 0) {
      this.game.handleMatches(matches, function() {
      this.game.cascade(this.checkBoard.bind(this))
      }.bind(this));
    } else {
      this.$ul.find("li").draggable("enable")
      this.disabled = false;
      if (!this.interval) {
        this.createInterval()
      }
      if (this.game.game_over()) {
        this.$notification.html(
          "<button class='shuffle'>Shuffle</button>")
      }
      if (this.time <= 0) {
        this.timeEnd()
      }
    }
  }.bind(this))
}

view.prototype.timeBonus = function (score) {
  if (this.turns === 0) {
    this.timerDraw()
    return
  }

  this.time = this.time + (1 / this.turns * score)
  if (this.time > 30 ) {
    this.time = 30
  }
  this.timerDraw()
}

view.prototype.shuffle = function (event) {
  event.preventDefault()
  this.score = this.score - 20
  this.drawBlocks()
  this.dragDrop()
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
      this.turns ++
      this.selected.removeClass("selected")
      Bejeweled.Block.switchColors($li, this.selected, this.checkBoard.bind(this))
      this.selected = null

    } else {
      this.selected.removeClass("selected");
      $li.addClass("selected");
      this.selected = $li;
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
