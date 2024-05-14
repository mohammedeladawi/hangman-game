let lettersContainer = document.querySelector('.letters');
let lettersArray = [...'abcdefghijklmnopqrstuvwxyz'];

// Generate letters in the lettersContainer
lettersArray.forEach(letter => {
    let span = document.createElement('span');
    let letterText = document.createTextNode(letter);
    span.appendChild(letterText);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
})

// Generate a random category and its random value
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

let categories = Object.keys(words);
let randomCategoryIndex = Math.floor(Math.random() * categories.length);
let randomCategory = categories[randomCategoryIndex];

let randomValueIndex = Math.floor(Math.random() * words[randomCategory].length);
let randomCategoryValue = words[randomCategory][randomValueIndex]

// Add a category to category span
document.querySelector('.category span').innerHTML = randomCategory;

// Add spans to letters-guess to guess the word
let lettersGuess = document.querySelector('.letters-guess');

let categoryValueLetters = Array.from(randomCategoryValue);
categoryValueLetters.forEach(letter => {
    let span = document.createElement('span')
    if (letter == ' ') {
        span.className = 'with-space';
    }
    lettersGuess.appendChild(span)
})

// Change style of the clicked letter and check if the clicked letter is exist at randomCategoryValue
let wrongAttempts = 0, rightAttempts = 0;
let hangmanDraw = document.querySelector('.hangman-draw')
document.addEventListener('click', function (e) {
    // Set the choosen status
    let theStatus = false;

    if (e.target.className === 'letter-box') {
        // Change style of the clicked letter
        e.target.classList.add('clicked');

        // Check if the clicked letter is exist at randomCategoryValue
        let guessSpans = document.querySelectorAll('.letters-guess span');
        categoryValueLetters.forEach((worldLetter, index) => {
            if (worldLetter.toLowerCase() === e.target.innerHTML.toLowerCase()) {
                guessSpans[index].innerHTML = `${e.target.innerHTML}`;
                theStatus = true;
                rightAttempts += 1;
            }
        });

        // If the clicked letter is wrong
        if (!theStatus) {
            hangmanDraw.classList.add(`wrong-${++wrongAttempts}`);
            document.getElementById('fail').play()
        } else {
            document.getElementById('success').play()
        }

        // if wrong attempts equals 8 disable the letter buttons and display game over popup
        if (wrongAttempts === 8) {
            endGame(`Game Over, The Word is ${randomCategoryValue}`);
        } else if (rightAttempts === categoryValueLetters.length) {
            endGame(`Congrats, You Won After ${wrongAttempts} Attempts`);
        }
    }
})

// End game popup function
function endGame(text) {
    let endDiv = document.createElement('div');
    let endTxt = document.createTextNode(text);
    endDiv.className = 'popup'
    endDiv.appendChild(endTxt);
    document.body.appendChild(endDiv);
    lettersContainer.classList.add('finished');
}