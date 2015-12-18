var tile = 80,
  speed = 150,
  i,
  j,
  columns,
  rows,
  thisCol,
  thisRow,
  originCol,
  originRow,
  gameBoard,
  items,
  score = 0,
  checkScore,
  gameOver;

gameBoard = [
  { row: 1, column: 1},
  { row: 1, column: 2},
  { row: 1, column: 3},
  { row: 1, column: 4},
  { row: 2, column: 1},
  { row: 2, column: 2},
  { row: 2, column: 3},
  { row: 2, column: 4},
  { row: 3, column: 1},
  { row: 3, column: 2},
  { row: 3, column: 3},
  { row: 3, column: 4},
  { row: 4, column: 1},
  { row: 4, column: 2},
  { row: 4, column: 3},
  { row: 4, column: 4},
];

$('#showNumbers').click(function() {
  $('main').toggleClass('numbers');
});

checkScore = function(thisCol, originCol, thisRow, originRow, tile, subtract) {
  if( thisCol === originCol && thisRow === originRow ) {
    score += 1;
    //tile.css('background-color', 'green');
    tile.addClass('success');
  } else if (subtract) {
    console.log('subtract = ' + subtract);
    score -= 1;
    //tile.css('background-color', '#ccc');
    tile.removeClass('success');
    console.log('take a point away');
  }
  if (score === gameBoard.length-1) {
    gameOver();
  }
};

gameOver = function() {
  alert('game over');
};

$(function() {
  FastClick.attach(document.body);
  gameBoard.sort(function() {
    return 0.5 - Math.random();
  });

  // move the tiles to random order
  items = $('.item');
  i = 0; // left value
  j = 0; // top value
  items.each( function(key, value){
    var thisTile = $(this);
    thisTile.css('left', ((gameBoard[key].column - 1) * tile) + 'px');
    thisTile.css('top', ((gameBoard[key].row - 1) * tile) + 'px');
    thisTile.attr('data-col', gameBoard[key].column);
    thisTile.attr('data-row', gameBoard[key].row);
    checkScore(
      gameBoard[key].column,
      parseInt(thisTile.attr('data-origin-col')),
      gameBoard[key].row,
      parseInt(thisTile.attr('data-origin-row')),
      $(this)
    );
  });

  // set the invisible tile at random
  column = Math.ceil(Math.random() * 4);
  row = Math.ceil(Math.random() * 4);
  $('.item[data-col=' + column + '][data-row=' + row + ']').css('display', 'none');

  // set click functions for tiles
  $('.item').click(function() {
    var currentTile = $(this);
    thisCol = parseInt(currentTile.attr('data-col'));
    thisRow = parseInt(currentTile.attr('data-row'));
    originCol = parseInt(currentTile.attr('data-origin-col'));
    originRow = parseInt(currentTile.attr('data-origin-row'));

    var pointMode = false;
    if (thisCol === originCol && thisRow === originRow) {
      pointMode = true;
    }

    // checkScore(thisCol, originCol, thisRow, originRow, $(this), pointMode);

    if ((thisCol + 1) === column && thisRow === row) {
      // console.log('you can move right');
      column = thisCol;
      row = thisRow;
      currentTile.attr('data-col', thisCol + 1);
      currentTile.animate({ left: '+=' + tile }, speed, function() {
        checkScore(thisCol + 1, originCol, thisRow, originRow, currentTile, pointMode);
      });
    } else if ((thisCol - 1) === column && thisRow === row) {
      // console.log('you can move left');
      column = thisCol;
      row = thisRow;
      currentTile.attr('data-col', thisCol - 1);
      currentTile.animate({ left: '-=' + tile }, speed, function() {
        checkScore(thisCol - 1, originCol, thisRow, originRow, currentTile, pointMode);
      });
    } else if ((thisRow + 1) === row && thisCol === column) {
      // console.log('you can move down');
      column = thisCol;
      row = thisRow;
      currentTile.attr('data-row', thisRow + 1);
      currentTile.animate({ top: '+=' + tile }, speed, function() {
        checkScore(thisCol, originCol, thisRow + 1, originRow, currentTile, pointMode);
      });
    } else if ((thisRow - 1) === row && thisCol === column) {
      // console.log('you can move up');
      column = thisCol;
      row = thisRow;
      currentTile.attr('data-row', thisRow - 1);
      currentTile.animate({ top: '-=' + tile }, speed, function() {
        checkScore(thisCol, originCol, thisRow - 1, originRow, currentTile, pointMode);
      });
    } else {
      // console.log('you can\'t move');
    }
    console.log(score);
  });



});
