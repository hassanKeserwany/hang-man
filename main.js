const letters = "abcdefghijklmnopqrstuvwxyz+#";

let letterArray = Array.from(letters);

let letterContainer = document.querySelector(".letters");
let wrong = document.querySelector(".wrong span");
let hangmanDraw = document.querySelector(".hangman-draw");

letterArray.forEach(function (letter) {
  let span = document.createElement("span");
  let myLetter = document.createTextNode(letter);

  span.appendChild(myLetter);

  span.className = "letter-box";

  letterContainer.appendChild(span);
});

const words = {
  "programming Language": [
    "JavaScript",
    "Python",
    "Java",
    "HTML",
    "CSS",
    "C++",
    "Ruby",
    "PHP",
    "Swift",
    "C#",
  ],
  movies: [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Adventure",
    "Romance",
    "Thriller",
    "Science Fiction",
    "Animation",
    "Fantasy",
  ],
  people: [
    "Mohammed",
    "Fatima",
    "Ali",
    "Aisha",
    "Ahmad",
    "Layla",
    "Omar",
    "Hana",
    "Abdullah",
    "Nour",
  ],
  countries: [
    "Saudi Arabia",
    "Egypt",
    "United Arab Emirates",
    "Morocco",
    "Algeria",
    "Sudan",
    "Iraq",
    "Yemen",
    "lebanon",
    "Jordan",
  ],
};
// get random key
const keyWords = Object.keys(words);
const randomIndex = Math.floor(Math.random() * keyWords.length);
const randomKey = keyWords[randomIndex];

let info = document.querySelector(".info h3 span");

info.innerHTML = randomKey;

// get random word
const randomWord =
  words[randomKey][Math.floor(Math.random() * words[randomKey].length)];

console.log(randomWord);
let lettersGuess = document.querySelector(".letters-guess");
let ArrayOfeachLetter = Array.from(randomWord);

ArrayOfeachLetter.forEach(function (ele) {
  // console.log(ele);
  let span = document.createElement("span");
  span.classList.add("mySpan");
  lettersGuess.appendChild(span);
  if (ele === " ") {
    span.classList.add("mySpan2");
  }
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span ");
let letterContainerSpan = document.querySelectorAll(".letters span");

let wrongAnswer = 0;
document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theChoosenLetter = e.target.innerHTML.toLowerCase();

    ArrayOfeachLetter.forEach(function (letter, index) {
      if (letter.toLowerCase() == theChoosenLetter) {
        document.querySelector("#success").play();
        guessSpans[index].innerHTML = theChoosenLetter;
        theStatus = true;

        e.target.style.backgroundColor = "green";
        e.target.style.opacity = 0.7;
      }
    });
    if (theStatus !== true) {
      document.querySelector("#fail").play();
      wrongAnswer++;
      wrong.innerHTML = wrongAnswer;

      hangmanDraw.classList.add(`wrong-${wrongAnswer}`);

      if (wrongAnswer === 9) {
        wrong.innerHTML = "Game over";
        letterContainerSpan.forEach(function (ele) {
          ele.classList.add("clicked");
        });

        let wrongSpan = (document.querySelector(".wrong span").style.color =
          "red");
        document.querySelector(".end span").innerHTML = randomWord;
      }
    }
  }
  // end if true
  let lettersGuessSpans = document.querySelectorAll(".letters-guess span");

  let allSpansFilled = true;

  lettersGuessSpans.forEach((ele) => {
    if (ele.textContent.trim() === "") {
      allSpansFilled = false;
      return;
    }
  });

  if (allSpansFilled) {
    wrong.innerHTML = "Great Job :)";
    letterContainerSpan.forEach(function (ele) {
      ele.classList.add("clicked");
    });
    document.querySelector(".end span").innerHTML = randomWord;
  } else {
    return;
  }
});
