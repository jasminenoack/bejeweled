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
    console.log($(block).index())
    return $(block).index()
  })
  if ($blocks.length === 0) {
    return callback()
  }

  var $bringDownTo = []
  var $add = []

  for (var i = 0; i < matchIndexs.length; i++) {
    console.log(matchIndexs[i])
    if (matchIndexs[i] < this.columns ) {
      console.log("add")
      // console.log(matchIndexs[i])
      $add.push($blocks[i])
    } else if (!_.contains(matchIndexs, matchIndexs[i] - this.columns)) {
      $bringDownTo.push($blocks[i])
    }
  }

  for (var i = 0; i < $add.length; i++) {
    var $block = $($add[i])
    Bejeweled.Block.colorBlock($block.removeAttr("class"))
  }

  for (var i = 0; i < $bringDownTo.length; i++) {
    // var $block = $($bringDownTo[i]);
    // var $upperBlock = $blocks.eq(i-this.columns)
    // Bejeweled.Block.switchColors($block, $upperBlock)
  }




  console.log($add, $bringDownTo)
  // recall cascade
  return callback()

}


})();
