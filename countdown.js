const fs = require('fs');
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

const possibilities = { words: [], maxLength: 0 };

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

  possibilities.maxLength = 0;
  //this resets the max posible length of a word that fits

  dictionary.forEach((word) => {
    for (letter of currentLetters) {
      if (!word.toLowerCase().split("").includes(letter)) return;
    }
    if (word.length > possibilities.maxLength)
      possibilities.maxLength = word.length;
    return possibilities.words.push(word);
  });
  //checks all possible words that fit

  if (!possibilities.words.length) countdown();
  //if it's impossible to solve, then get a new pair of letters

  rl.question(
    `Please input a word that includes all the following letters. The longer the word, the more points you earn!
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

      console.log(
        `Good job! Another word you could have gone with is ${getRandom(
          possibilities.words.filter(
            (w) => w !== currentWord && w.length === possibilities.maxLength
          )
        )}`
      );
      letterAmount = 2 + Math.floor(Math.cbrt(levelNumber));
      levelNumber++;
      score += Math.floor(currentWord.length ** letterAmount / 2);
      countdown();
    }
  );
}

countdown();

rl.on("close", function () {

  const highScore = fs.readFileSync('./highscore.txt', 
  {encoding:'utf8', flag:'r'}); 

  console.log(
    `You could have gone with "${getRandom(
      possibilities.words.filter((w) => w.length === possibilities.maxLength)
    )}" :(... but unfortunately you lost, you got ${levelNumber} words right and your final score is ${score}`
  );


  if (score > highScore)  {
    console.log(`Congratulations on setting a new high score, though! You're now at ${highScore} points`)

    fs.writeFileSync('./highscore.txt', `${score}`);
    //overwrites previous high score
    //maybe one could keep previous high scores in order to make comparisons?

    console.log(`You did set a new highscore though... ${highScore}`)
  }
  else {
    console.log(`Your highscore is still ${highScore}`)
  }

  process.exit(0);
});
