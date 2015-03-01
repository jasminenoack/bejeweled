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

game.prototype.findMatches = function ($ul) {
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
    $block.on("transitionend", function () {
      callback()
    })
  }
}

game.prototype.cascade = function(callback) {
  var $blocks = this.$ul.find(".match")
  var matchIndexs = $blocks.map(function(index, block) {
    return $(block).index()
  })
  if ($blocks.length === 0) {
    return callback()
  }

  var bringDownTo = []
  var add = []

  // find change set
  // check from bottom up
  for (var i = 0; i < matchIndexs.length; i++) {
    if (matchIndexs[i] < this.columns ) {
      add.push($blocks.eq(matchIndexs[i]))
    } else if (!_.contains(matchIndexs, matchIndexs[i] - this.columns)) {
      bringDownTo.push($blocks.eq(matchIndexs[i]))
    }
  }

  for (var i = 0; i < add.length; i++) {
    console.log($blocks.eq(i))
    var $block = $blocks.eq(i)
    Bejeweled.Block.colorBlock($blocks.eq(i).removeAttr("class"))
  }




  console.log(add, bringDownTo)
  // recall cascade
  return callback()

}


})();
