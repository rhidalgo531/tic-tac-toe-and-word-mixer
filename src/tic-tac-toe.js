/**
 * tic-tac-toe.js
 * @author  Raify Hidalgo <rmh391@nyu.edu>
 */

function repeat(value, n) {
  var array = [];
  for (var i = 0; i < n; i++) {
    array.push(value);
  }
  return array;
}

function generateBoard(rows, columns, initialCellValue) {
  var board = [];
  for (var i = 0; i < columns; i++) {
     var local = repeat(initialCellValue, rows);
     board = board.concat(local);
  }
  return board;
}

function rowColToIndex(board, rowNumber, columnNumber) {
  var dimension = Math.sqrt(board.length);
  return (rowNumber * dimension) + columnNumber;
}

function indexToRowCol(board, i) {
  var dimension = Math.sqrt(board.length);
  var row = -1;
  for (var j = 0; j < i; j+= dimension) {
    row++;
  }
  var col = i - (row * dimension);
  var map = {
    "row": row,
    "col": col
  };
  return map;
}

function setBoardCell(board, letter, row, col) {
  var index = rowColToIndex(board, row, col);
  var copy = [];
  for (var i = 0; i < board.length; i++) {
    copy[i] = board[i];
  }
  copy[index] = letter;
  return copy;
}

function algebraicToRowCol(algebraicNotation) {
  var letterValues = {
         "A": 1, "B": 2, "C": 3, "D": 4, "E": 5, "F": 6, "G": 7, "H": 8, "I": 9, "J": 10,
         "K": 11, "L": 12, "M": 13, "N": 14, "O": 15, "P": 16, "Q": 17, "R": 18, "S": 19, "T": 20,
         "U": 21, "V": 22, "W": 23, "X": 24, "Y": 25, "Z": 26
 };
 var array = [" ", " "];
  array[0] = algebraicNotation.slice(0,1);
  array[1] = algebraicNotation.slice(1,3);

  if (array.length !== 2) { // condition 1: must have two positions, letter & number
    return undefined;
  }
  else if (isNaN(array[1])) { // condition 2: second position must be a number
    return undefined;
  }
  else if (array[1] <= 0) { // condition 3: number must not be out of bounds
    return undefined;
  }
  else if (isNaN(array[0])) { // condition 4: first position cannot be a number
    var row = 0;
    var col = 0;
    if (letterValues[array[0]]) { // condition 5: must be matching letter
      row = letterValues[array[0]] - 1;
      col = array[1] - 1;
      var map = {
        "row": row,
        "col": col
      };
      return map;
    }
    else {
      return undefined;
    }
  }
}

function placeLetter(board, letter, algebraicNotation) {
  var map = algebraicToRowCol(algebraicNotation);
    var copy = setBoardCell(board, letter, map.row, map.col);
    return copy;
}

function boardToString(board) {
//  var dimension = Math.sqrt(board.length);
  var header = "\n      "; // done
  var interrupt = "      "; // done

  var dimension = Math.sqrt(board.length);
  var copy = generateBoard(dimension, dimension, " ");
  var full = "";

  for (var i = 1; i <= dimension; i++) {
    var localHeader = "  " + i + " ";
    header = header + localHeader;

    var localInterrupt = "+---";
    interrupt = interrupt + localInterrupt;
}
var b = 0;
for (var i = 0; i < board.length; i++) {
   if (i % dimension === 0) {
     copy[i] = " " + String.fromCodePoint(65 + b) + "  | " + board[i] + " | ";
     b++;
   }
   else {
   copy[i] = board[i] + " | ";
 }
}
//  full = full + header;
  for (var i = 0; i < board.length; i++) {
    if (i % dimension === 0) {
      full = full + "\n" + interrupt + "\n "  + " " + copy[i];
    }
    else {
      full = full + copy[i];
    }

  }
  return header + "\n" + full + "\n" + interrupt;
  //  var localBoard = String.fromCodePoint(64 + i) + " | " + board[i - 1]];
  //  boardLong = boardLong + localBoard;


}



function getWinnerRows(board) {
  var dimension = Math.sqrt(board.length);
  var result = false;

  // Test X and Y for each array going across the board
  for (var i = 0; i < dimension; i++) {
    var arr = board.slice(i * dimension, dimension*(i + 1));
    result = arr.every(isSameX);
    if (result === true) {
      return 'X';
    }
    else {
      result = arr.every(isSameO);
      if (result === true) {
        return 'O';
      }
    }
  }

  function isSameX(element) {
    return element === "X";
  }
  function isSameO(element) {
    return element === "O";
  }
}

function getWinnerCols(board) {
  var dimension = Math.sqrt(board.length);
  for (var i = 0; i < dimension; i++) {
    var array = [];
    for (var j = 0; j < dimension; j++) {
      array.push(board[(j * dimension) + i]);
    }

    var result = array.every(isSameX);
    if (result === true) {
      return 'X';
    }
    else {
      result = array.every(isSameO);
      if (result === true) {
        return 'O';
      }
    }

  }
  function isSameX(element) {
    return element === "X";
  }
  function isSameO(element) {
    return element === "O";
  }
}

function getWinnerDiagonals(board) {
  var dimension = Math.sqrt(board.length);
    var array = [];
    var array2 = [];

    for (var j = 0; j < dimension; j++) { // diagonal from left
      array.push(board[(j * dimension) + j]);
      array2.push(board[(dimension - 1) * (1 + j)]);
    }

    var result = array.every(isSameX);
    var result2 = array2.every(isSameX);
    if (result === true || result2 === true) {
      return 'X';
    }
    else {
      result = array.every(isSameO);
      result2 = array2.every(isSameO);
      if (result === true || result2 === true) {
        return 'O';
      }
      else {
        return undefined;
      }
    }

    function isSameX(element) {
      return element === "X";
    }
    function isSameO(element) {
      return element === "O";
    }
  }

function isBoardFull(board) {
  var full = true;
  for (var i = 0; i < board.length; i++) {
    if (board[i] === " ") {
      return false;
    }
  }
  return full;
}

function isValidMove(board, row, col) {
  var index = rowColToIndex(board, row, col);
  var dimension = Math.sqrt(board.length);
  for (var i = 0; i < board.length; i++) {
    if (board[index] === " " && row >= 0 && row < dimension && col >= 0 && col < dimension) {
      return true;
    }
    else {
      return false;
    }
  }
}

function isValidMoveAlgebraicNotation(board, algebraicNotation) {
  var map = algebraicToRowCol(algebraicNotation);
  if (map === undefined) {
    return false;
  }
  else return isValidMove(board, map.row, map.col);
}

function getRandomEmptyCellIndex(board) {
  var count = 0;
  var open = [];
  for (var i = 0; i < board.length; i++) {
    if (board[i] === " ") {
      count++;
      open.push(i);
    }
  }
  if (count !== 0) {
    if (count === 1) {
      return open[0];
    }
    else {
      var ran = Math.floor((Math.random() * count));
      return open[ran];
    }
  }
  else return undefined;
}

module.exports = {
  repeat: repeat,
  generateBoard: generateBoard,
  rowColToIndex: rowColToIndex,
  indexToRowCol: indexToRowCol,
  setBoardCell: setBoardCell,
  algebraicToRowCol: algebraicToRowCol,
  placeLetter: placeLetter,
  boardToString: boardToString,
  getWinnerRows: getWinnerRows,
  getWinnerCols: getWinnerCols,
  getWinnerDiagonals: getWinnerDiagonals,
  isBoardFull: isBoardFull,
  isValidMove: isValidMove,
  isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
  getRandomEmptyCellIndex: getRandomEmptyCellIndex
};
