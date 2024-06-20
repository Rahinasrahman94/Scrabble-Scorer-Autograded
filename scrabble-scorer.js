// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
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

function oldScrabbleScorer(userData) {

	let userInput = userData.toUpperCase();
	let letterPoints = "";
   for (let i = 0; i <userInput.length; i++)
   {
   for (const pointValue in oldPointStructure) 
   {
   if(oldPointStructure[pointValue].includes(userInput[i])) 
   {
	letterPoints += `Points for '${userInput[i]}': ${pointValue}\n`
	}
   }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() 
{
console.log("Let's play some scrabble! Enter a word:");
let word = input.question("Enter a word to score");
return word;
};

let newPointStructure = transform(oldPointStructure);
let simpleScorer=function(userData)
{
  let simpleWord = userData.toUpperCase(); 
  let score = simpleWord.length;
  return score;
};
let vowelBonusScorer=function(userData){
let  userInput = userData.toUpperCase();  
let vowelBonusscore=0;
for (let index = 0; index < userInput.length; index++) 
{
if (userInput[index] === 'A' ||userInput[index] === 'E' || userInput[index] === 'I' || userInput[index] === 'O' || userInput[index] === 'U' )
{
vowelBonusscore += 3; 
}
else{
vowelBonusscore += 1;
}
}
return vowelBonusscore;
};
let scrabbleScorer = function(userData){
let points = 0;
let userInput = userData.toLowerCase();
for(let i=0;i<userInput.length;i++)
{
points += newPointStructure[userInput[i]];     
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
function scorerPrompt(userInput) {
let userData = userInput;
console.log("0 - Simple: One point per character");
console.log("1 - Vowel Bonus: Vowels are worth 3 points");
console.log("2 - Scrabble: Uses scrabble point system");
let algorithmNumber = input.question("Enter 0 or 1 or 2");
// return scoringAlgorithms[algorithmNumber].name,scoringAlgorithms[algorithmNumber].scoringFunction(word);
return scoringAlgorithms[algorithmNumber].scorerFunction(userData);
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
function runProgram()
{
let userData = initialPrompt();
console.log(scorerPrompt(userData));
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
