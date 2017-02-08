/* *
 * scrabble.js
 * @author Raify Hidalgo <rmh391@nyu.edu>
 */

// global value of letters, in case the values need to be altered easily
 var letterValues = {
        "E": 1, "A": 1, "I": 1, "O": 1, "N": 1, "R": 1, "T": 1, "L": 1, "S": 1, "U": 1,
        "D": 2, "G": 2, "B": 3, "C": 3, "M": 3, "P": 3, "F": 4, "H": 4, "V": 4, "W": 4,
        "Y": 4, "K": 5, "J": 8, "X": 8, "Q": 10, "Z": 10
};

var topSet = []; // set to use later for determining top five scores

function main() {
  prompt();


  function prompt() {
  var readline = require('readline');

  // --------- User prompt, ask for letters
  var userPrompt = readline.createInterface({
    input : process.stdin,
    output : process.stdout
  });

  userPrompt.question('Please enter some letters \n >>', handleUserInput);

  function handleUserInput(response) {
    data(response);
    userPrompt.close();
  }
}
// ---- End of prompt

function data(response) {
  var arr = [];
  for (var i = 0; i < response.length; i++) {
    arr.push(response.slice(0 + i, 1 + i));
  }
  var readline = require('readline');
  var fs = require('fs');
  var fileName = '../data/enable1.txt';

  var fileInput = readline.createInterface({
    input : fs.createReadStream(fileName)
  });

  fileInput.on('line', handleLine);
   fileInput.on('close', handleClose);

  function handleLine(line) {

    // create an object for each word that comes in, with word, score, and set boolean
     var words = {
       word: [],
       score : 0,
       inSet : false
     };
     words.word = line;
     words.score = computeScore(line, letterValues); // sum up for score value

     // create copy of users input to avoid altering it
     var copy = [];
     for (var i = 0; i < arr.length; i++) {
       copy.push(arr.slice(i, i + 1));
     }

     findSet(words, copy); // find set of words that can be generated


     if (words.inSet && true) {
       topSet.push(words);
      }
  }
  // ------ End of handle line function

  function computeScore(line, letterValues) {
    var sum = 0;
    for (var i = 0; i < line.length; i++){
      var character = String(line.slice(i, i + 1));
      sum += letterValues[character.toUpperCase()];
    }
    return sum;
  }

  // Match the words that can be generated through user input by iterating through
  // every letter per word and comparing to every user inputed letter, once
  // matched then the user input letter is out of consideration

  function findSet(words, userCopy) {
      var count = 0;
      var goal = words.word.length;
      for (var i = 0; i < goal; i++) {
        var copyTwo = userCopy;
        for (var j = 0; j < copyTwo.length; j++) {
          if (words.word.slice(i,i+1) == copyTwo.slice(j, j + 1)) {
            count++;
            copyTwo.splice(j, 1);
            break;
          }
      }
  }
  if (goal === count) {
    //  diagnostic(words, count, goal, copyTwo.length)  // diagnose when words are compared
    words.inSet = true;
    }
  }


  function handleClose() {
     if (topSet.length >= 1) {
       setTopFive();
       displayTopFive();
     }
  }

  function setTopFive() {
    for (var i = 0; i < topSet.length; i++) {
      for (var j = 0; j < i; j++) {
        if (topSet[i].score > topSet[j].score) {
          var temp = topSet[i];
          topSet[i] = topSet[j];
          topSet[j] = temp;
          }
        }
      }
    }

    function displayTopFive() {
      for (var i = 0; i < 5; i++) {
        if (topSet[i]) {
          console.log(topSet[i].word + ' : ' + topSet[i].score);
        }
      }
    }
/**
    In case words need to be checked individually, this will show the words that hit,
    alongside what their score is, how many user input letters matched, and how many
    were leftovers

    function diagnostic(words, count, goal, leftovers) {
      console.log('word: ' + words.word + ' score: ' + words.score +  ' count: '
       + count + ', goal : ' + goal + ' , leftovers : ' + leftovers);
    }
**/
  // -------------- End

  }
}

main();
