/**
 * game.js
 * @author Raify Hidalgo <rmh391@nyu.edu>
 */

  var tic = require("./tic-tac-toe.js");
  var readlineSync = require('readline-sync');
  readlineSync.question("Starting Game of Tic Tac Toe - Press Enter");
  var width = questionWidth(); // row & col sizes
  var letter = questionLetter(); // users choice
  var board = tic.generateBoard(width, width, " ");
  var goOn = true;
  var displayBoard = tic.boardToString(board);
  console.log("Player is: " + letter + "\n" + displayBoard); // Initial empty display board

  var computerMoves = process.argv[2] ? JSON.parse(process.argv[2]) : undefined;

  if (letter === "X") {
    goFirst(goOn);
  }
  else if (letter === "O"){
    goSecond(goOn);
  }

  function goFirst(go) { // User goes first as they are X
    while (go) { // go will be the flag to allow for continuous play
      if (tic.isBoardFull(board)) { // Repeatedly check if board is full
        console.log("Board full. It's a tie!");
        go = false; // end game if full
        return;
      }
      switch(letter) { // letter will determine turn, X = user, O = cpu
        case "X" : // user goes first as X
                  var choice = readlineSync.question(
                    "What's your move? (Enter in algebraic notation: ex Z11) \n >> ");
                    if (tic.isValidMoveAlgebraicNotation(board, choice)) { // check if move is valid
                      var boardU = tic.placeLetter(board, letter, choice); // temp board
                      var displayBoard = tic.boardToString(boardU);
                      console.log(displayBoard);
                      board = boardU; // update board to continue using board as variable

                      if (tic.getWinnerRows(board) === "X" || tic.getWinnerCols(board) === "X" ||
                      tic.getWinnerDiagonals(board) === "X") { // check for winning move
                        console.log("Player wins!");
                        go = false;
                      }
                      letter = "O"; // switch control flow
                    }
                    else { // if not valid move, don't do anything, will re-do
                      console.log("Improper move, try again");
                    }
                  break;
        case "O" : // Computer goes after as O
                  readlineSync.question("Press enter to see computers turn \n >> ");
                  var move;
                  if(computerMoves && computerMoves.length > 0) { // if moves passed in
                    var arr = computerMoves.splice(0, 1)[0]; // get move
                    if(tic.isValidMove(board, arr[0], arr[1])) { // check if valid
                      move = {'row':arr[0], 'col':arr[1]};
                      var boardC = tic.setBoardCell(board, letter, move.row, move.col);
                      var displayC = tic.boardToString(boardC);
                      console.log(displayC);
                      board = boardC;

                      if (tic.getWinnerRows(board) === "O" || tic.getWinnerCols(board) === "O" ||
                      tic.getWinnerDiagonals(board) === "O") {
                        console.log("CPU wins!"); // check winning move for cpu
                        go = false;
                      }
                      letter = "X";
                      }
                    else {
                      console.log("Computer recollects"); // in the case that computer
                      // makes invalid move, specifically if passed-in move is the same
                      // as the move the user already selected
                      }
                    }
                   // if we still don't have a valid move, just get a random empty square
                   else  {
                     move = tic.indexToRowCol(board, tic.getRandomEmptyCellIndex(board));
                     var boardC = tic.setBoardCell(board, letter, move.row, move.col);
                     var displayCPU = tic.boardToString(boardC);
                     console.log(displayCPU);
                     board= boardC;

                     if (tic.getWinnerRows(board) === "O" || tic.getWinnerCols(board) === "O" ||
                     tic.getWinnerDiagonals(board) === "O") {
                       console.log("CPU wins!");
                       go = false;
                     }
                     letter = "X"; // switch control flow

                  }
                  break;
                }
              }
            }
            /**
            function: goSecond()
            description: This function will play similar to the goFirst() function
            but since the control flow is based on the letter, but since the user
            picked O and will go second yet the first passed-in value is O,
            the function will continue as if O is the computers move and X is the
            users move, with another value to use as the board letter
            **/


  function goSecond(go) {
    while (go) {
      if (tic.isBoardFull(board)) { // check for tie
        console.log("Board full. It's a tie!");
        go = false;
        return;
      }
      switch(letter) {
        case "X" : // Users move logic as O
                  var userWrites = "O"; // letter that will be used
                  var choice = readlineSync.question(
                    "What's your move? (Enter in algebraic notation: ex Z11) \n >> ");
                    if (tic.isValidMoveAlgebraicNotation(board, choice)) {
                      var boardU = tic.placeLetter(board, userWrites, choice);
                      var displayBoard = tic.boardToString(boardU);
                      console.log(displayBoard);
                      board = boardU; // update board

                      if (tic.getWinnerRows(board) === "O" || tic.getWinnerCols(board) === "O" ||
                      tic.getWinnerDiagonals(board) === "O") { // check winning move
                        console.log("Player wins!");
                        go = false;
                      }
                      letter = "O"; // switch control flow
                    }
                    else { // if not valid move
                      console.log("Improper move, try again");
                    }
                  break;
        case "O" : // computers turn as X
                  readlineSync.question("Press enter to see computers turn \n >> ");
                  var move;
                  var cpuWrites = "X";
                  if(computerMoves && computerMoves.length > 0) {
                    var arr = computerMoves.splice(0, 1)[0];
                    // make sure it's a valid move!
                    if(tic.isValidMove(board, arr[0], arr[1])) {
                      move = {'row':arr[0], 'col':arr[1]};
                      var boardC = tic.setBoardCell(board, cpuWrites, move.row, move.col);
                      var displayC = tic.boardToString(boardC);
                      console.log(displayC);
                      board = boardC;

                      if (tic.getWinnerRows(board) === "X" || tic.getWinnerCols(board) === "X" ||
                      tic.getWinnerDiagonals(board) === "X") {
                        console.log("CPU wins!");
                        go = false;
                      }
                      letter = "X";
                      }
                    else {
                      console.log("Computer recollects");
                      }
                    }
	                     // if it's not valid, move remains undefined
                   // if we still don't have a valid move, just get a random empty square
                   else  {
                     move = tic.indexToRowCol(board, tic.getRandomEmptyCellIndex(board));
                     var boardC = tic.setBoardCell(board, cpuWrites, move.row, move.col);
                     var displayCPU = tic.boardToString(boardC);
                     console.log(displayCPU);
                     board= boardC;

                     if (tic.getWinnerRows(board) === "X" || tic.getWinnerCols(board) === "X" ||
                     tic.getWinnerDiagonals(board) === "X") {
                       console.log("CPU wins!");
                       go = false;
                     }
                     letter = "X";
                  }
                  break;
                }
              }
            }

  function questionWidth() {
    var size = readlineSync.question("How wide should the board be? - (Enter: 1 - 26) \n >> ");
    if (size >= 1 && size <= 26) { // make sure size is valid
      return size;
    }
    else {
      console.log("Invalid entry, please try again");
      questionWidth();
    }
  }

  function questionLetter() {
    var Go = true;
    while (Go) {
      var choose = readlineSync.question(
        "What letter would you like to be? - (Enter X or O) \n >> ");
      if (choose === "X" || choose === "O") {
        return choose;
      }
    }
  }
