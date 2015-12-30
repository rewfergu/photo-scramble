var board = document.getElementById('board');
var shuffleBtn = document.getElementById('shuffleBtn');
var speed = 0.25;
var boardSize = 500;
var tileSize = 50;
var tileArray = [];

// set the invisible tile at random
var activeColumn = Math.ceil(Math.random() * 4) * tileSize;
var activeRow = Math.ceil(Math.random() * 4) * tileSize;
console.log(activeRow/tileSize, activeColumn/tileSize);

var Tile = function(board, row, col) {
  var _originRow = row;
  var _originCol = col;
  var _tile = document.createElement('div');

  var _pointMode = false;
    if (col === _originCol && row === _originRow) {
      _pointMode = true;
    }

  _tile.style.left = col + "px";
  _tile.style.top = row + "px";

  board.appendChild(_tile);
  _tile.addEventListener("click", function() {
    console.log(row/tileSize, col/tileSize, activeRow/tileSize, activeColumn/tileSize);
    if ((col + tileSize) === activeColumn && row === activeRow) {
      console.log('you can move right');
      activeColumn = col;
      activeRow = row;
      col += tileSize
      TweenMax.to(_tile, speed, {
        left: col + "px"
      });
    } else if ((col - tileSize) === activeColumn && row === activeRow) {
      console.log('you can move left');
      activeColumn = col;
      activeRow = row;
      col -= tileSize;
      TweenMax.to(_tile, speed, {
        left: col + "px"
      });
    } else if ((row + tileSize) === activeRow && col === activeColumn) {
      console.log('you can move down');
      activeColumn = col;
      activeRow = row;
      row += tileSize;
      TweenMax.to(_tile, speed, {
        top: row + "px"
      });
    } else if ((row - tileSize) === activeRow && col === activeColumn) {
      console.log('you can move up');
      activeColumn = col;
      activeRow = row;
      row -= tileSize;
      TweenMax.to(_tile, speed, {
        top: row + "px"
      });
    } else {
      console.log('you can\'t move');
    }
  });

  return {
    row: row,
    col: col,
    move: function(suffleCol, shuffleRow) {
      row = shuffleRow;
      col = suffleCol;
      TweenMax.to(_tile, 3, {
        top: row + "px",
        left: col + "px"
      });
    },
    hide: function() {
      _tile.style.display = "none";
    }
  };
}

// set game board
for (var rowCount = 0; rowCount < 7; rowCount++) {
  for (var colCount = 0; colCount < 10; colCount++) {
    var spacer = false;

    tileArray.push(new Tile(board, rowCount*tileSize, colCount*tileSize));
  }
}

shuffleBtn.addEventListener('click', function() {
  tileArray.sort(function() { return 0.5 - Math.random() });

  // shuffle game board
  for (var rowCount = 0; rowCount < 7; rowCount++) {
    for (var colCount = 0; colCount < 10; colCount++) {
      var loc = colCount + (rowCount*10);
      if (rowCount == (activeRow/tileSize) && colCount == (activeColumn/tileSize)) {
        tileArray[loc].hide();
      }
      tileArray[loc].move(colCount*tileSize,rowCount*tileSize);
    }
  }
});
