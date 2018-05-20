'use strict';

//Array of Presidents

var selectableWords = [
        "WASHINGTON",
        "JEFFERSON",
        "LINCOLN",
        "HAMILTON",
        "JACKSON",
        "GRANT",
        "FRANKLIN",
        "MCKINLEY",
        ];

//variable for user tries         
const maxTries = 10;

//variables for index of randomly selected word, remaining chances, guessed letters, wins

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var hasFinished = false;
var wins = 0;

var winSound = new Audio('./assets/sounds/register.mp3');


function resetGame() {

    //reset chances
    remainingGuesses = maxTries;

    //new random President
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    
    
    //reset chosen letter array and guessed word array
    guessedLetters = [];
    guessingWord = [];

    //generate new mystery word
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++){
        guessingWord.push("_");
    }

    //update HTML display
    updateDisplay();
};

function updateDisplay() {
    //updating total wins
    document.getElementById("totalWins").innerText = wins;
    
    //update current word display
   document.getElementById("currentWord").innerText = "";
      for (var i= 0; i < guessingWord.length; i++){
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
                
   
    //update remaining chances and previously guessed letters
    document.getElementById('remainingGuesses').innerText = remainingGuesses;
    document.getElementById('guessedLetters').innerText= guessedLetters;
};

function evaluateGuess(letter) {
    var positions = [];
    

    //loop through mystery word to check if selected letter matches
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        
        //if selected letter matches push letter to guessed letters string
        if (selectableWords[currentWordIndex][i] === letter){
            positions.push(i);
        }
    }


    //if letter does not match a letter in the name deduct 1 from chances
    if (positions.length <= 0) {
        remainingGuesses--;
    } 
    //if selected letter does match push letter to space in chosen word array
    else {
        for(var i = 0; i < positions.length; i++){
            guessingWord[positions[i]] = letter;
        }
    }
};


//function to check game status/if random word array has been completed.  Wining.
 function checkWin() {
     if(guessingWord.indexOf("_") === -1) {
         wins++;
         hasFinished = true;
     }
 };    

 //function to check if user is a loser.
 function checkLoss() {
     if(remainingGuesses <= 0) {
         alert('You Lose!');
         hasFinished = true;
     }
    };


 //function for making a guess and checking that guessed letter has not been used yet.
 function makeGuess(letter) {
    //if statement to validate player has another chance. 
    if(remainingGuesses > 0) {
                         
        //if statement to validate selected letter has not been previosuly used.  Validates against the guessed letter array.
         if (guessedLetters.indexOf(letter) === -1){
             guessedLetters.push(letter);
             evaluateGuess(letter);
         }
     }
 };

//function for user key entry

document.onkeydown = function(event) {
    
    if (hasFinished) {
         resetGame();
         hasFinished = false;
    } else {
         
//statement for if game is in play and key pressed is a valid letter cycle through functions to validate key is part of chosen word, updating display with new key, updating game progression.
         if(event.keyCode >= 65 && event.keyCode <= 90){
             makeGuess(event.key.toUpperCase());
             updateDisplay();
             checkWin();
             checkLoss();
             winSound.play();
           }
     }
 };