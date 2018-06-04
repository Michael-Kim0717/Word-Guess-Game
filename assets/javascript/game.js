/* Variables */

// Contains all the possible words to be guessed as well as their location on the map.
var countries = ["Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria",
                 "Bahamas", "Bangladesh", "Barbados", "Bulgaria", "Belgium", "Brazil", "Bolivia",
                 "Cambodia", "Canada", "Czech Republic", "Colombia", "Costa Rica", "Croatia",
                 "Dominican Republic", "Denmark",
                 "Ethiopia",
                 "Finland", "France",
                 "Germany", "Greece", "Guatemala", "Guinea",
                 "Honduras", "Hungary",
                 "Iceland", "Indonesia", "Israel",
                 "Jamaica",
                 "Kazakhstan", "Kuwait",
                 "Lebanon", "Liechtenstein", "Lithuania",
                 "Macedonia", "Madagascar", "Malaysia", "Maldives", "Mexico", "Mongolia", "Mozambique",
                 "Netherlands", "New Zealand", "Nicaragua", "Nigeria", "North Korea",
                 "Pakistan", "Panama", "Paraguay", "Philippines", "Poland", "Portugal", "Puerto Rico",
                 "Romania", "Rwanda", "Russia",
                 "Saudi Arabia", "Senegal", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Korea", "Switzerland", "Sweden",
                 "Tanzania", "Thailand", "Tunisia", "Turkey",
                 "Uganda", "Ukraine", "Uruguay", "Uzbekistan",
                 "Venezuela", "Vietnam",
                 "Zimbabwe"];

// Contains the initial 5 guesses.
var numberOfGuesses = 5;

// Contains the win counter (how many words the user got correct).
var winCounter = 0;

// Contains a blank array since no letters have been guessed.
var lettersGuessed = [];

// Contains a blank variable for now that will later change into a random word from the above array.
var startingWord = "hello";

// Contains a blank array that serves to show guessed letters and unguessed letters.
var guessingWord = [];

/* Functions */

// Happens whenever the page loads.
function onLoad(){ 
    document.getElementById("country-pic").hidden = true;
    document.getElementsByClassName('onWin')[0].style.visibility = 'hidden';
    document.getElementsByClassName('onWin')[1].style.visibility = 'hidden';
}
window.onload = onLoad;

// Whenever any key is pressed, call this function.
document.onkeydown = function () {
    // Get the key that was pressed and log it to the console.
    var keyPress = event.key;
    console.log(keyPress);

    // To initiate the game, let the user press any key.
    if (document.getElementById("start-text").innerText == "Press any button to begin..." || document.getElementById("start-text").innerText == "Press any button to continue..."){ 
        // Get a random word from the list of countries and display blanks depending on the amount of letters.
        startingWord = countries[Math.floor(Math.random() * countries.length)];
        console.log(startingWord);
        guessingWord = [];
        for (var i = 0; i < startingWord.length; i++){
            if (startingWord[i] == ' '){
                console.log("SPACE");
                guessingWord.push("\n");
            }
            else {
                guessingWord.push("_ ");
            }
        }
        document.getElementById("start-text").innerText = guessingWord.join("");
        document.getElementById("start-text").style.fontSize = "2.5em";

        // Reset the finishing text, country picture, and values if applicable.
        document.getElementById("finish-text").innerText = "";
        document.getElementById("country-pic").hidden = true;
        
        document.getElementsByClassName('onWin')[0].style.visibility = 'hidden';
        document.getElementsByClassName('onWin')[1].style.visibility = 'hidden';
        
        numberOfGuesses = 5;
        document.getElementsByClassName('numGuesses')[0].innerText = numberOfGuesses;
        document.getElementsByClassName('numGuesses')[1].innerText = numberOfGuesses;
        lettersGuessed = [];
        document.getElementsByClassName('guessedArray')[0].innerText = " ";
        document.getElementsByClassName('guessedArray')[1].innerText = " ";
    }
    // If the game has already started, perform an action depending on if a LETTER is pressed.
    else if (isLetter(keyPress)) {
        // If the key pressed is in the word that the user needs to guess,
        // Fill in the letters.
        console.log(startingWord + " " + keyPress);
        if (containsLetter(startingWord, keyPress) && !lettersGuessed.includes(keyPress.toUpperCase())){
            // Replaces any underscores with the correctly guessed letter.
            startingWord = startingWord.toLowerCase();
            for (var i = 0; i < startingWord.length; i++){
                if (startingWord.charAt(i) == keyPress){
                    guessingWord[i] = keyPress.toUpperCase() + " ";
                    document.getElementById("start-text").innerText = guessingWord.join("");
                }
            }

            // Enter in the guessed letter into the array.
            lettersGuessed.push(keyPress.toUpperCase());
            document.getElementsByClassName('guessedArray')[0].innerText = lettersGuessed;
            document.getElementsByClassName('guessedArray')[1].innerText = lettersGuessed;
            
            // If the word has been fully completed, restart.
            if (isFinished(guessingWord)){
                // Show a message after the user has won the round.
                document.getElementById("start-text").innerText = "Press any button to continue...";
                document.getElementById("finish-text").innerText = "YOU WIN! Your country was " + startingWord.toUpperCase() + "!";
                
                document.getElementById("country-pic").hidden = false;
                document.getElementById("country-pic").src = "./assets/images/" + startingWord.toLowerCase() + ".jpg";
                
                document.getElementsByClassName('onWin')[0].style.visibility = 'visible';
                document.getElementsByClassName('onWin')[1].style.visibility = 'visible';

                document.getElementById("start-text").style.fontSize = "1.25em";

                // Add a win to the win counter.
                winCounter += 1;
                document.getElementsByClassName('numWins')[0].innerText = winCounter;
                document.getElementsByClassName('numWins')[1].innerText = winCounter;
            }
        }
        // If letter doesn't match a letter within the word AND,
        // If the letter is not contained within the lettersGuessed array,
        // Subtract a guess attempt and update variables accordingly.
        else if (!containsLetter(startingWord, keyPress) && !lettersGuessed.includes(keyPress.toUpperCase())){
            lettersGuessed.push(keyPress.toUpperCase());
            document.getElementsByClassName('guessedArray')[0].innerText = lettersGuessed;
            document.getElementsByClassName('guessedArray')[1].innerText = lettersGuessed;

            numberOfGuesses = numberOfGuesses - 1;
            document.getElementsByClassName('numGuesses')[0].innerText = numberOfGuesses;
            document.getElementsByClassName('numGuesses')[1].innerText = numberOfGuesses;
        }
        // If the numberOfGuesses reaches 0,
        // Create a new blank word for the user to guess, and reset the variables.
        if (numberOfGuesses == 0){
            // Show a message after the user has won the round.
            document.getElementById("start-text").innerText = "Press any button to continue...";
            document.getElementById("finish-text").innerText = "You lost... Your country was " + startingWord.toUpperCase() + "!";
            
            document.getElementById("country-pic").hidden = false;
            document.getElementById("country-pic").src = "./assets/images/" + startingWord.toLowerCase() + ".jpg";
            
            document.getElementsByClassName('onWin')[0].src = "./assets/images/sad.gif";
            document.getElementsByClassName('onWin')[1].src = "./assets/images/sad.gif";
            document.getElementsByClassName('onWin')[0].style.visibility = 'visible';
            document.getElementsByClassName('onWin')[1].style.visibility = 'visible';

            document.getElementById("start-text").style.fontSize = "1.25em";

            // Reset win counter.
            // Add a win to the win counter.
            winCounter = 0;
            document.getElementsByClassName('numWins')[0].innerText = winCounter;
            document.getElementsByClassName('numWins')[1].innerText = winCounter;
        }
    }
}

// Regex function to check if the key pressed is a letter.
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

// If the key pressed is within the word that the user needs to guess, return true, else false.
function containsLetter(startingWord, keyPress) {
    startingWord = startingWord.toLowerCase();
    for (var i = 0; i < startingWord.length; i++){
        if (startingWord.charAt(i) == keyPress){
            return true;
        }
    }
    return false;
}

// Checks if the word has been fully completed or not.
function isFinished(guessingWord){
    for (var i = 0; i < guessingWord.length; i++){
        if (guessingWord[i] == "_ "){
            return false;
        }   
    }
    return true;
}