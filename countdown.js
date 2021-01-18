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

let level = 2;

let score = 0;

const possibilities = {words: []}

function countdown() {
  let currentLetters = [];
  for (let i = 0; i < level; i++) {
    let lettersLeft = alphabet.filter((el) => !currentLetters.includes(el));
    currentLetters.push(getRandom(lettersLeft));
  }

  let lettersStringified = currentLetters.join(", ");

  //this checks if it is actually possible to answer the question.

  possibilities.words = [];

  dictionary.forEach(word => {
    for (letter of currentLetters) {
      if (!word.toLowerCase().split("").includes(letter)) return;
    }
    return possibilities.words.push(word);
  })

  if (!possibilities.words.length) countdown();

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
      console.log(`Good job! Another word you could have gone with is ${getRandom(possibilities.words.filter(w => w !== currentWord))}`);
      level = 2 + Math.floor(Math.cbrt(score));
      score++;
      countdown();
    }
  );
}

countdown();

rl.on("close", function () {
  console.log(
    `You could have gone with "${getRandom(possibilities.words)}" :(... but unfortunately you lost, and your score was ${score}`
  );
  process.exit(0);
});
