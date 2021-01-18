const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const wholeDictionary = require("./english.json");

const dictionary = Object.keys(wholeDictionary);

let alphabet = [...Array(26).keys()].map((i) => String.fromCharCode(i + 97));

const getRandom = (array = alphabet) =>
  array[Math.floor(Math.random() * array.length)];

let letterAmount = 2;

let levelNumber = 0;
//how many words you got right so far

let score = 0;
//your current total score



const possibilities = {words: []}

function countdown() {
  let currentLetters = [];
  for (let i = 0; i < letterAmount; i++) {
    let lettersLeft = alphabet.filter((el) => !currentLetters.includes(el));
    currentLetters.push(getRandom(lettersLeft));
  }

  let lettersStringified = currentLetters.join(", ");

  //this checks if it is actually possible to answer the question.

  possibilities.words = [];

  //this resets the words array

  dictionary.forEach(word => {
    for (letter of currentLetters) {
      if (!word.toLowerCase().split("").includes(letter)) return;
    }
    return possibilities.words.push(word);
  })
  //checks all possible words that fit

  if (!possibilities.words.length) countdown();
  //if it's impossible to solve, then get a new pair of letters

  rl.question(
    `Please input a word that includes all the following letters:
    ${lettersStringified}
    
    `,
    function (currentWord) {
      currentWord = currentWord.toLowerCase();
      if (!possibilities.words.includes(currentWord)) {
        rl.close();
      }

      for (letter of currentLetters) {
        if (!currentWord.split("").includes(letter)) rl.close();
      }

      //get to next level
      
      console.log(`Good job! Another word you could have gone with is ${getRandom(possibilities.words.filter(w => w !== currentWord))}`);
      letterAmount = 2 + Math.floor(Math.cbrt(levelNumber));
      levelNumber++;
      score += Math.floor((currentWord.length ** letterAmount) / 2);
      countdown();
    }
  );
}

countdown();

rl.on("close", function () {
  console.log(
    `You could have gone with "${getRandom(possibilities.words)}" :(... but unfortunately you lost, you got ${levelNumber} words right and your final score is ${score}`
  );
  process.exit(0);
});
