// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
let word;
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   word = input.question("Enter a word to score");
   
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer=function(word)
{

  let simpleWord = word.toUpperCase(); 
  let score = 0;
  for(let i=0;i<simpleWord.length;i++)
     {
    score += 1;
     }
     return score;

};

let vowelBonusScorer=function(word){
   word = word.toUpperCase();  
   let vowelBonusscore=0;
   for (let index = 0; index < word.length; index++) {
     if (word[index] === 'A' ||word[index] === 'E' || word[index] === 'I' || word[index] === 'O' || word[index] === 'U' )
      {
         vowelBonusscore += 3; 
      }
      else{
         vowelBonusscore += 1;
      }
      
   }
   return vowelBonusscore;
};


let scrabbleScorer = function(word){

   let points = 0;
   word = word.toLowerCase();
   for(let i=0;i<word.length;i++)
   {
         points += newPointStructure[word[i]];     
   }
  return points;
};

const scoringAlgorithms = [
   {
       name:"SimpleScore",
       description:"Each letter is worth 1 point",
       scorerFunction : simpleScorer
   
   },
   {
       name : "BonusVowels",
       description:"Vowels are 3 pts, consonants are 1 pt.",
       scorerFunction: vowelBonusScorer
   },
   {
       name:"Scrabble",
       description:"The traditional scoring algorithm..",
       scorerFunction : scrabbleScorer
     }
  

];

function scorerPrompt() {

   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   let algorithmNumber = input.question("Enter 0 or 1 or 2");
  // return scoringAlgorithms[algorithmNumber].name,scoringAlgorithms[algorithmNumber].scoringFunction(word);
return scoringAlgorithms[algorithmNumber].scorerFunction(word);
}

function transform(Object) 
   {
      let splittedObj = {};
      let splitChar = [];
      for(let item in Object)
           {
            splitChar = Object[item];
              for(let i=0;i<splitChar.length;i++)
                 {
                   splittedObj[splitChar[i].toLowerCase()] = parseInt(item);
                   }
           }
        return splittedObj;
     }


function runProgram() {
   initialPrompt();
   console.log(scorerPrompt(word));
   transform(oldPointStructure);
   
}

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
