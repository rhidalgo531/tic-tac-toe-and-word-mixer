/* jshint expr: true, maxlen: false */

var chai = require('chai');
var expect = chai.expect; 
var tic = require('../src/tic-tac-toe.js');

describe('tic-tac-toe', function() {

    describe('repeat', function() {
        // don't worry about incorrect range (<= 0, for example)
        // and don't worry about types
        it('creates an array by repeating value, ele, n times', function() {
            var arr = tic.repeat("hello", 3);
            var expected = ["hello", "hello", "hello"];
            expect(arr).to.deep.equal(expected);
        });
    });

    describe('generateBoard', function() {
        it('generates a board with specified number of rows and columns', function() {
            var board = tic.generateBoard(3, 3, " ");
            var expected = [" ", " ", " ", " ", " ", " ", " ", " ", " ", ];
            expect(board).to.deep.equal(expected);
        });
    });

    describe('rowColToIndex', function() {
        it('translates a row and column to an index, assumes board is square', function() {
            var board = tic.generateBoard(3, 3, " ");
            var i = tic.rowColToIndex(board, 1, 1);
            var j = tic.rowColToIndex(board, 0, 2);
            expect(i).to.equal(4);
            expect(j).to.equal(2);
        });
    });

    describe('indexToRowCol', function() {
        it('translates an index to a row and col (as an object)', function() {
            var board = tic.generateBoard(3, 3, " ");
            var rowCol1 = tic.indexToRowCol(board, 4);
            var rowCol2 = tic.indexToRowCol(board, 2);
            expect(rowCol1).to.deep.equal({"row": 1, "col": 1});
            expect(rowCol2).to.deep.equal({"row": 0, "col": 2});
        });
    });

    describe('setBoardCell', function() {
        it('sets the cell to the letter specified by row and col', function() {
            var board = tic.generateBoard(3, 3, " ");
            var b1 = tic.setBoardCell(board, "X", 1, 1);
            var b2 = tic.setBoardCell(b1, "O", 0, 2);
            expect(b1).to.deep.equal([" ", " ", " ", " ", "X", " ", " ", " ", " "]);
            expect(b2).to.deep.equal([" ", " ", "O", " ", "X", " ", " ", " ", " "]);
        });
    });

    describe('algebraicToRowCol', function() {
        it('translates algebraic notation to row and col (as object keys and vals)', function() {
            expect(tic.algebraicToRowCol("B2")).to.deep.equal({"row": 1, "col": 1});
            expect(tic.algebraicToRowCol("A3")).to.deep.equal({"row": 0, "col": 2});
        });

        it('returns undefined if the notation only contains a row', function() {
            expect(tic.algebraicToRowCol("A")).to.be.undefined;
        });

        it('returns undefined if the notation only contains a column', function() {
            expect(tic.algebraicToRowCol("2")).to.be.undefined;
        });

        it('returns undefined if the notation\'s row and column are transposed', function() {
            expect(tic.algebraicToRowCol("2")).to.be.undefined;
        });

        it('returns undefined if the notation contains invalid characters', function() {
            expect(tic.algebraicToRowCol(" ")).to.be.undefined;
            expect(tic.algebraicToRowCol("A 2")).to.be.undefined;
            expect(tic.algebraicToRowCol("A:2")).to.be.undefined;
            expect(tic.algebraicToRowCol("**")).to.be.undefined;
        });
    });

    describe('placeLetter', function() {
        it('places a letter on a board based on algebraic notation move', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'O', "A3");
            expect(board).to.deep.equal([" ", " ", "O", " ", "X", " ", " ", " ", " "]);
        });
    });

    describe('boardToString', function() {
        it('formats a board', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'O', "A3");
			var expected = "     1   2   3  \n   +---+---+---+\n A |   |   | O |\n   +---+---+---+\n B |   | X |   |\n   +---+---+---+\n C |   |   |   |\n   +---+---+---+\n";
            expect(tic.boardToString(board)).to.equal(expected);
        });
    });

    describe('getWinnerRows', function() {
        it('returns the letter that won the board by filling a row', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "B1");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "B3");
            expect(tic.getWinnerRows(board)).to.equal('X');
        });

        it('returns undefined if no winner, missing last', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "B1");
            board = tic.placeLetter(board, 'X', "B2");
            expect(tic.getWinnerRows(board)).to.be.undefined;
        });

        it('returns undefined if no winner, missing first', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "B3");
            expect(tic.getWinnerRows(board)).to.be.undefined;
        });
    });

    describe('getWinnerCols', function() {
        it('returns the letter that won the board by filling a column', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A2");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "C2");
            expect(tic.getWinnerCols(board)).to.equal('X');
        });

        it('returns undefined if no winner, missing top', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A2");
            board = tic.placeLetter(board, 'X', "B2");
            expect(tic.getWinnerCols(board)).to.be.undefined;
        });

        it('returns undefined if no winner, missing bottom', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "C2");
            expect(tic.getWinnerCols(board)).to.be.undefined;
        });
    });

    describe('getWinnerDiagonals', function() {
        it('returns the letter that won the board by filling a upper left to lower right diagonal', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A1");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "C3");
            expect(tic.getWinnerDiagonals(board)).to.equal('X');
        });

        it('returns the letter that won the board by filling a upper left to lower right diagonal', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A3");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "C1");
            expect(tic.getWinnerDiagonals(board)).to.equal('X');
        });

        it('returns undefined if no winner, missing center', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A3");
            board = tic.placeLetter(board, 'O', "B2");
            board = tic.placeLetter(board, 'X', "C1");
            expect(tic.getWinnerDiagonals(board)).to.be.undefined;
        });
    });

    describe('isBoardFull', function() {
        it('returns true if there are no spaces left on the board', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A1");
            board = tic.placeLetter(board, 'X', "A2");
            board = tic.placeLetter(board, 'X', "A3");
            board = tic.placeLetter(board, 'X', "B1");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "B3");
            board = tic.placeLetter(board, 'X', "C1");
            board = tic.placeLetter(board, 'X', "C2");
            board = tic.placeLetter(board, 'X', "C3");
            expect(tic.isBoardFull(board)).to.be.true;
        });

        it('returns false if there are still empty cells left on the board', function() {
            var board = tic.generateBoard(3, 3, " ");
            expect(tic.isBoardFull(board)).to.be.false;

            board = tic.placeLetter(board, 'X', "A2");
            board = tic.placeLetter(board, 'X', "A3");
            board = tic.placeLetter(board, 'X', "B1");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "B3");
            board = tic.placeLetter(board, 'X', "C1");
            board = tic.placeLetter(board, 'X', "C2");
            board = tic.placeLetter(board, 'X', "C3");
            expect(tic.isBoardFull(board)).to.be.false;
        });
    });

    
    describe('isValidMove', function() {
        it('returns true if move is played into empty cell that is within the board\'s dimensions', function() {
            var board = tic.generateBoard(3, 3, " ");
            expect(tic.isValidMove(board, 1, 1)).to.be.true;
        });

        it('returns false if move is out of bounds', function() {
            var board = tic.generateBoard(3, 3, " ");
            expect(tic.isValidMove(board, 3, 3)).to.be.false;
        });

        it('returns false if target square is not empty', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'O', "B2");
            expect(tic.isValidMove(board, 1, 1)).to.be.false;
        });
    });

    describe('isValidMoveAlgebraicNotation', function() {
        it('returns true if move is played into empty cell that is within the board\'s dimensions', function() {
            var board = tic.generateBoard(3, 3, " ");
            expect(tic.isValidMoveAlgebraicNotation(board, 'B2')).to.be.true;
        });

        it('returns false if move is out of bounds', function() {
            var board = tic.generateBoard(3, 3, " ");
            expect(tic.isValidMoveAlgebraicNotation(board, 'D5')).to.be.false;
        });

        it('returns false if move is played into occupied cell', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A3");
            expect(tic.isValidMoveAlgebraicNotation(board, 'A3')).to.be.false;
        });
    });

    describe('getRandomEmptyCellIndex', function() {
        it('returns the only remaining index of a cell with no letter', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A1");
            board = tic.placeLetter(board, 'X', "A2");
            board = tic.placeLetter(board, 'X', "A3");
            board = tic.placeLetter(board, 'X', "B1");
            board = tic.placeLetter(board, 'X', "B3");
            board = tic.placeLetter(board, 'X', "C1");
            board = tic.placeLetter(board, 'X', "C2");
            board = tic.placeLetter(board, 'X', "C3");
            var i = tic.getRandomEmptyCellIndex(board);
            expect(i).to.equal(4);
        });

        it('returns the index of a cell that does not have a letter', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A1");
            board = tic.placeLetter(board, 'X', "A2");
            board = tic.placeLetter(board, 'X', "A3");
            board = tic.placeLetter(board, 'X', "C1");
            board = tic.placeLetter(board, 'X', "C2");
            board = tic.placeLetter(board, 'X', "C3");
            var i = tic.getRandomEmptyCellIndex(board);
            expect(i).to.be.oneOf([3, 4, 5]);
        });

        it('returns undefined if board is full', function() {
            var board = tic.generateBoard(3, 3, " ");
            board = tic.placeLetter(board, 'X', "A1");
            board = tic.placeLetter(board, 'X', "A2");
            board = tic.placeLetter(board, 'X', "A3");
            board = tic.placeLetter(board, 'X', "B1");
            board = tic.placeLetter(board, 'X', "B2");
            board = tic.placeLetter(board, 'X', "B3");
            board = tic.placeLetter(board, 'X', "C1");
            board = tic.placeLetter(board, 'X', "C2");
            board = tic.placeLetter(board, 'X', "C3");
            var i = tic.getRandomEmptyCellIndex(board);
            expect(i).to.be.undefined;
        });
    });
});
