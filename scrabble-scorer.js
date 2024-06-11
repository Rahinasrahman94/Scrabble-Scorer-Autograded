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
         points += newPointStructure[word[i]]
         
         
   }
  // console.log(points)
  return points;
};

const scoringAlgorithms = [
   {
     name:"SimpleScore",
      description:"Each letter is worth 1 point",
      scoringFunction : simpleScorer
   
   },
   {
      name : "BonusVowels",
      description:"Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScorer
   },
   {
      name:"Scrabble",
      description:"The traditional scoring algorithm..",
      scoringFunction : scrabbleScorer
     }
  

];

function scorerPrompt() {

   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log( "2 - Scrabble: Uses scrabble point system");
   let algorithmNumber = input.question("Enter 0 or 1 or 2");
  // return scoringAlgorithms[algorithmNumber].name,scoringAlgorithms[algorithmNumber].scoringFunction(word);
return scoringAlgorithms[algorithmNumber].scorerFunction(word);
}

function transform(object) {
   let objectEntries = Object.entries(object);
   const finalObject = objectEntries.map(
      ([prop, propValue]) => { return [propValue, prop]; }
   );
   let newObject = Object.fromEntries(finalObject); 
      let keys = Object.keys(newObject);
      for(var i = 0; i < keys.length; ++i) {
          var key = keys[i],
              subkeys = key.split(/,\s?/),
              target = newObject[key];
           delete newObject[key];
          subkeys.forEach(function(key) { newObject[key] = target;})
}
Object.keys(newObject).forEach(function(el){
   newObject[el] = parseInt(newObject[el])
 })
   var ke = Object.keys(newObject);
   var n = ke.length;
   while (n--) {
     var k = ke[n]; // "cache" it, for less lookups to the array
     if (k !== k.toLowerCase()) { // might already be in its lower case version
      newObject[k.toLowerCase()] = newObject[k] // swap the value to a new lower case key
         delete newObject[k] // delete the old key
     }
  // return (newObject);
 }

 //console.log(newObject)
// console.log(newobj);
 return newObject;
}
 


function runProgram() {
   initialPrompt();
   console.log(scorerPrompt(word));
   transform(oldPointStructure);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
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
