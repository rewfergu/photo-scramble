var board = document.getElementById('board');
var shuffleBtn = document.getElementById('shuffleBtn');
var speed = 0.25;
var boardSize = 320;
var tileSize = 80;
var tileArray = [];
var score = 0;

// set the invisible tile at random
var activeColumn = Math.floor(Math.random() * 4) * tileSize;
var activeRow = Math.floor(Math.random() * 4) * tileSize;
console.log(activeRow / tileSize, activeColumn / tileSize);

var Tile = function(board, row, col) {
  var _originRow = row;
  var _originCol = col;
  var _tile = document.createElement('div');

  var _subtract = false;

  _tile.style.left = col + 'px';
  _tile.style.top = row + 'px';

  board.appendChild(_tile);
  _tile.addEventListener('click', function() {

    if (col === _originCol && row === _originRow) {
      _subtract = true;
    } else {
      _subtract = false;
    }

    console.log(row / tileSize, col / tileSize, activeRow / tileSize, activeColumn / tileSize);
    if ((col + tileSize) === activeColumn && row === activeRow) {
      console.log('you can move right');
      activeColumn = col;
      activeRow = row;
      col += tileSize;
      TweenMax.to(_tile, speed, {
        left: col + 'px',
        onComplete: checkScore(col, _originCol, row, _originRow, _tile, _subtract),
      });
    } else if ((col - tileSize) === activeColumn && row === activeRow) {
      console.log('you can move left');
      activeColumn = col;
      activeRow = row;
      col -= tileSize;
      TweenMax.to(_tile, speed, {
        left: col + 'px',
        onComplete: checkScore(col, _originCol, row, _originRow, _tile, _subtract),
      });
    } else if ((row + tileSize) === activeRow && col === activeColumn) {
      console.log('you can move down');
      activeColumn = col;
      activeRow = row;
      row += tileSize;
      TweenMax.to(_tile, speed, {
        top: row + 'px',
        onComplete: checkScore(col, _originCol, row, _originRow, _tile, _subtract),
      });
    } else if ((row - tileSize) === activeRow && col === activeColumn) {
      console.log('you can move up');
      activeColumn = col;
      activeRow = row;
      row -= tileSize;
      TweenMax.to(_tile, speed, {
        top: row + 'px',
        onComplete: checkScore(col, _originCol, row, _originRow, _tile, _subtract),
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
      TweenMax.to(_tile, 1, {
        top: row + 'px',
        left: col + 'px',
      });
    },

    hide: function() {
      _tile.classList.add('hide');
    },
  };
};

// set game board
for (var rowCount = 0; rowCount < 4; rowCount++) {
  for (var colCount = 0; colCount < 4; colCount++) {
    tileArray.push(new Tile(board, rowCount * tileSize, colCount * tileSize));
  }
}

shuffleBtn.addEventListener('click', function() {
  tileArray.sort(function() {
    return 0.5 - Math.random();
  });

  var spacer = document.querySelector('.hide');
  if (spacer) {
    spacer.classList.remove('hide');
  }

  console.log(activeRow / tileSize, activeColumn / tileSize);

  // shuffle game board
  for (var rowCount = 0; rowCount < 4; rowCount++) {
    for (var colCount = 0; colCount < 4; colCount++) {
      var loc = colCount + (rowCount * 4);
      if (rowCount == (activeRow / tileSize) && colCount == (activeColumn / tileSize)) {
        console.log('hide this tile');
        tileArray[loc].hide();
      }

      tileArray[loc].move(colCount * tileSize, rowCount * tileSize);
    }
  }
});

checkScore = function(thisCol, originCol, thisRow, originRow, tile, subtract) {
  if (thisCol === originCol && thisRow === originRow) {
    score += 1;
    tile.classList.add('success');
  } else if (subtract) {
    console.log('subtract = ' + subtract);
    score -= 1;
    tile.classList.remove('success');
    console.log('take a point away');
  }

  if (score === tileArray.length - 1) {
    gameOver();
  }
};

gameOver = function() {
  alert('game over');
};
