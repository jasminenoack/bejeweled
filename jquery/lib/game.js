;(function (){

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
}

var game = Bejeweled.Game = function (rows, columns, $ul) {
  this.rows = rows;
  this.columns = columns;
  this.neighbors = [1, -1, columns, -columns];
  this.$ul = $ul
}

game.prototype.validSwitch = function (pos, target) {
  for (var i = 0; i < this.neighbors.length; i++) {
    if ( pos + this.neighbors[i] === target ) {
      return true
    }
  }
  return false
}

game.prototype.findMatches = function () {
  var $ul = this.$ul
  var set, cIndex, nIndex, color, next
  var colors = Bejeweled.Block.findColors($ul)
  var sets = []
  var matchDirs = [1, this.columns]

  for (cIndex = 0; cIndex < colors.length; cIndex++) {
    color = colors[cIndex]
    for (mIndex = 0; mIndex < matchDirs.length; mIndex++) {
      set = [cIndex]
      nextIndex = set[set.length-1] + matchDirs[mIndex]

      while(color === colors[nextIndex]) {
        if (matchDirs[mIndex] === 1 && nextIndex % this.columns === 0) {
          break
        }
        set.push(nextIndex)
        nextIndex = set[set.length-1] + matchDirs[mIndex]
      }

      if (set.length >= 3) {
        sets = _.uniq(sets.concat(set))
      }
    }
  }

  return sets
}

game.prototype.handleMatches = function (indexs, callback) {
  var $block = null;
  var $blocks = this.$ul.find("li")
  // remove matches
  for(var i = 0; i < indexs.length; i++) {
    $block = $($blocks[indexs[i]])
    $block.addClass("match")
  }

  if (!$block) {
    callback()
  } else {
    // $block.one("transitionend", function () {
      callback()
    // })
  }
}

var cascade = game.prototype.cascade = function(callback) {
  setTimeout(function () {
    var $blocks = this.$ul.find("li")
    var $matchBlocks = this.$ul.find(".match")
    var matchIndexs = $matchBlocks.map(function(index, block) {
      return $(block).index()
    })
    if ($matchBlocks.length === 0) {
      return callback()
    }

    var $fullAbove = []
    var $add = []

    for (var i = 0; i < matchIndexs.length; i++) {
      if (matchIndexs[i] < this.columns ) {
        $add.push($matchBlocks[i])
      } else if (!(_.contains(matchIndexs, matchIndexs[i] - this.columns))) {
        $fullAbove.push($matchBlocks[i])
      }
    }

    for (var i = 0; i < $add.length; i++) {
      var $block = $($add[i])
      Bejeweled.Block.colorBlock($block.removeAttr("class"))
    }

    for (var i = 0; i < $fullAbove.length; i++) {
      var $block = $($fullAbove[i])
      var $upperBlock = $($blocks[$block.index() - 8])
      if (i === $fullAbove.length - 1) {
        Bejeweled.Block.switchColors($block, $upperBlock)
      } else {
        Bejeweled.Block.switchColors($block, $upperBlock)
      }
    }
    this.isTransitionsEnd($fullAbove, this.cascade.bind(this, callback))
  }.bind(this), 200)
}

game.prototype.isTransitionsEnd = function (blocks, callback) {
  var transitioning = false
  for (var i = 0; i < blocks.length; i ++) {
    if ($(blocks[i]).data("transitioning")) {
      transitioning = true
    }
  }

  if (transitioning) {
    $(blocks).one("transitionend", function () {
      transitions = []

      transitioning = false
      for (var i = 0; i < blocks.length; i ++) {
        if ($(blocks[i]).data("transitioning")) {
          transitioning = true
        }
      }

      if (!transitioning) {
        return (setTimeout(callback, 5))
      }
    }.bind(this))
  } else {
    return (setTimeout(callback, 5))
  }
}

})();
