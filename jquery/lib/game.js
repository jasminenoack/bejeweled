;(function (){

if (window.Bejeweled === undefined) {
  window.Bejeweled = {}
}

var game = Bejeweled.Game = function (rows, columns, $lis) {
  this.rows = rows;
  this.columns = columns;
  this.neighbors = [1, -1, columns, -columns];
  this.$blocks = $lis
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

game.prototype.handleMatches = function (indexs) {
  // remove matches
  for(var i = 0; i < indexs.length; i++) {
    var $block = $(this.$blocks[indexs[i]])
    console.log($block)
    $block.addClass("match")
  }
}


})();
