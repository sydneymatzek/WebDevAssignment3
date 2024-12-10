// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100
let attempts = 0;  // To count the number of attempts

// Get the form elements
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const feedbackBox = document.getElementById('feedback');
const highScoreBox = document.getElementById('highScore');

// Event listener for submission
guessForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload on form submission

    const userGuess = parseInt(guessInput.value);  // Get user's guess as an integer
    attempts++;  // Increment attempts

    // Check if the guess is correct, too high, or too low
    if (userGuess === randomNumber) {
        feedbackBox.textContent = `Correct! It took you ${attempts} attempts.`;
        // Generate a new number for the next round
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;  // Reset attempts for the new game
    } 
    else if (userGuess > randomNumber) {
        feedbackBox.textContent = 'Too High!';
    } 
    else {
        feedbackBox.textContent = 'Too Low!';
    }

    // Clear the input field for the next guess
    guessInput.value = '';
    guessInput.focus();
});


