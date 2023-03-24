const input = require('sync-input'); // include jetbrain's library
const words = ["python", "java", "swift", "javascript"]; // array of words
const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
let wins = 0;
let loses = 0;
let attempts = 8;
let guessedLetters = [];
let answer = words[Math.floor(Math.random() * words.length)]; // choose random word from the list
let solution = '-'.repeat(answer.length); // crate variable to show what letters are already guessed

function welcoming() {
    console.log("H A N G M A N  // "  + attempts + " attempts");
}

function resetVariables(){
    answer = words[Math.floor(Math.random() * words.length)]; // choose random word from the list
    solution = '-'.repeat(answer.length); // crate variable to show what letters are already guessed
    guessedLetters = [];
    attempts = 8;
}

function game() {
    while (attempts > 0) { // counter to calculate attemps quantity
        console.log("\n" + solution); // show what letters are already guessed
        if (solution === answer) { // check if we have already guessed the word
            wins++;
            console.log("You guessed the word " + solution + "!"); // congratulation message
            console.log("You survived!");
            return;
        }
        const letter = input(`Input a letter: `); //welcoming message to enter the symbol
        if (letter.length == 1) {

            if (alphabet.includes(letter)) { //checking if this is a english lowercase letter
                if (guessedLetters.includes(letter)) { //checking if we already guessed this letter
                    console.log("You've already guessed this letter")
                } else if (answer.includes(letter)) {
                    solution = solution.replace(/-/g,
                        (c, i) => i === answer.indexOf(letter, i) ? letter : c); // updating current status of guessing word
                } else {
                    attempts--; // decrease counter of avalible attemps
                    console.log("That letter doesn't appear in the word." + "  // " + attempts + " attempts");
                }
                if (!guessedLetters.includes(letter)) {
                    guessedLetters.push(letter);
                } // adding letter to an array of the letters we've already tried
                //console.log(guessedLetters);
            } else {
                console.log("Please, enter a lowercase letter from the English alphabet.");
            }
        } else {
            console.log("Please, input a single letter.");
        }
    }
    loses++;
    console.log("\nYou lost!");
}

function results(){ // function shows current score
    console.log(`You won: ${wins} times.
You lost: ${loses} times.`);
}

function program() {
    welcoming();
    while (true) {
        let userChoice = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
        if (userChoice == "play"){
            resetVariables()
            game();
        }

        else if(userChoice == "results"){
            results();
        }

        else if(userChoice == "exit"){
            break;
        }
        else{
            console.log("Please enter a valid number!");
        }
    }
}

program();