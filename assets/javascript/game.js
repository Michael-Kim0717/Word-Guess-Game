/* Variables */

// Contains all the possible words to be guessed as well as their location on the map.
var countries = ["Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria",
                 "Bahamas", "Bangladesh", "Barbados", "Bulgaria", "Belgium", "Brazil", "Bolivia",
                 "Cambodia", "Canada", "Czech Republic", "Colombia", "Costa Rica", "Croatia",
                 "Dominican Republic", "Denmark",
                 "Ethiopia",
                 "Finland", "France",
                 "Germany", "Great Britain", "Greece", "Guatemala", "Guinea",
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
var countryMaps = [];

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

        // Reset the finishing text and values if applicable.
        document.getElementById("finish-text").innerText = "";
        
        numberOfGuesses = 5;
        document.getElementById("numGuesses").innerText = numberOfGuesses;
        lettersGuessed = [];
        document.getElementById("guessedArray").innerText = " ";
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
            document.getElementById("guessedArray").innerText = lettersGuessed;
            
            // If the word has been fully completed, restart.
            if (isFinished(guessingWord)){
                // Show a message after the user has won the round.
                document.getElementById("start-text").innerText = "Press any button to continue...";
                document.getElementById("finish-text").innerText = "YOU WIN! Your word was " + startingWord.toUpperCase() + "!";

                // Add a win to the win counter.
                winCounter += 1;
                document.getElementById("numWins").innerText = winCounter;
            }
        }
        // If letter doesn't match a letter within the word AND,
        // If the letter is not contained within the lettersGuessed array,
        // Subtract a guess attempt and update variables accordingly.
        else if (!containsLetter(startingWord, keyPress) && !lettersGuessed.includes(keyPress.toUpperCase())){
            lettersGuessed.push(keyPress.toUpperCase());
            document.getElementById("guessedArray").innerText = lettersGuessed;
            numberOfGuesses = numberOfGuesses - 1;
            document.getElementById("numGuesses").innerText = numberOfGuesses;
        }
        // If the numberOfGuesses reaches 0,
        // Create a new blank word for the user to guess, and reset the variables.
        if (numberOfGuesses == 0){
            // Generate a new blank word from the array.
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

            // Reset the numberOfGuesses and the guessedArray.
            numberOfGuesses = 5;
            document.getElementById("numGuesses").innerText = numberOfGuesses;
            lettersGuessed = [];
            document.getElementById("guessedArray").innerText = " ";

            // Reset win counter.
            // Add a win to the win counter.
            winCounter = 0;
            document.getElementById("numWins").innerText = winCounter;
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