const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  // Add more questions as needed
];

var currentQuestion = 0;
var score = 0;
var timeInterval;
var times;
$("#highscore-title").hide();
$("#initials").hide();

$("#start-btn").click(function () {
  $("#start-btn").hide();
  $("#question-container").show();
  $("#highscores-btn").hide();
  $("#title").hide();
  $("#timer-container").show();
  startTimer(); // Start the timer with a duration of 60 seconds
  showQuestion();
});

function startTimer() {
  window.times = 60;
  var timeInterval = setInterval(function () {
    times--;
    const timerContainer = $("#timer-container");
    timerContainer.html(`<p>Time left: ${times} seconds</p>`);
    if (times === 0) {
      alert("Time's up! Quiz is over.");
      enterHighscores();
      clearInterval(timeInterval);
    }
    if (times < 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

function showQuestion() {
  const questionContainer = $("#question-container");
  const currentQuizData = quizData[currentQuestion];

  questionContainer.html(`
        <h2>${currentQuizData.question}</h2>
        <ul>
            ${currentQuizData.answers
              .map((answer) => `<li>${answer}</li>`)
              .join("")}
        </ul>
    `);

  // Handle answer selection
  $("ul li").click(function () {
    const selectedAnswer = $(this).text();
    checkAnswer(selectedAnswer);
  });
}

function checkAnswer(answer) {
  const currentQuizData = quizData[currentQuestion];
  const feedbackContainer = $("#feedback-container");

  if (answer === currentQuizData.correctAnswer) {
    feedbackContainer.html("<p>Correct!</p>").css("color", "white");
    score++;
  } else {
    feedbackContainer
      .html(
        `<p>Incorrect. The correct answer is ${currentQuizData.correctAnswer}.</p>`
      )
      .css("color", "white");
    times = times - 10;
  }

  feedbackContainer.fadeIn().delay(1000).fadeOut(); // Display feedback for 1 second before fading out

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    setTimeout(function () {
      showQuestion();
    }, 1000); // Wait for feedback to be visible before moving to the next question
  } else {
    setTimeout(function () {
      $("#feedback-container").empty();
      $("#feedback-container")
        .html(`<h2>Your Score: ${score} out of ${quizData.length}</h2>`)
        .css("color", "white");
      $("#next-btn").hide();
      enterHighscores();
      times = -5;
    }, 1000);
    return;
  }
}

// Handle highscores button click
$("#highscores-btn").click(function showHighscores() {
  $("#highscores-list").show();
  $("#highscore-title").show();
  $("#quiz-container").hide();
  $("#start-btn").hide();
  $("#title").hide();
  $("#highscores-btn").hide();
  $("#back-btn").show();
  loadHighscores(); // Load highscores when the highscores screen is displayed
});

function showHighscores() {
  $("#highscores-list").show();
  $("#highscore-title").show();
  $("#quiz-container").hide();
  $("#question-container").hide();
  $("#timer-container").hide();
  $("#start-btn").hide();
  $("#title").hide();
  $("#highscores-btn").hide();
  $("#back-btn").show();
  $("#initials").hide();
  $("#submit-btn").hide();
  $("#entry-container").hide();
  loadHighscores(); // Load highscores when the highscores screen is displayed
}

function enterHighscores() {
  $("#quiz-container").hide();
  $("#question-container").hide();
  $("#timer-container").hide();
  $("#start-btn").hide();
  $("#title").hide();
  $("#highscores-btn").hide();
  $("#submit-btn").show();
  $("#entry-container").show();
  $("#initials").show();
  const entryContainer = $("#entry-container");

  //log information to local when submitted

  entryContainer.html(`
          <h1>Enter Your Initials</h1>
          <h2>Your Score: ${score} out of ${quizData.length}</h2>
      `);
  var initials = $("#initials").value;
  console.log(initials);
  $("#submit-btn").click(function () {
    if (initials === "") {
      alert("error. initials cannot be blank");
    } else {
      alert("success. Registered successfully");
      var initialsStore = $("#initials").val();
      console.log(initialsStore);
      //   localStorage.setItem("highscores", JSON.stringify(savedHighscores));
      showHighscores();
    }
  });
}

$("#back-btn").click(function () {
  $("#start-btn").show();
  $("#question-container").hide();
  $("#highscores-btn").show();
  $("#title").show();
  $("#back-btn").hide();
  $("#highscores-list").hide();
  $("#highscore-title").hide();
  $("#initials").hide();
});

function loadHighscores() {
  const highscoresList = $("#highscores-list");
  const savedHighscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Display highscores
  highscoresList.empty();
  savedHighscores.forEach((entry, index) => {
    highscoresList.append(
      `<li>${index + 1}. ${entry.initials} - ${entry.score}</li>`
    );
  });
}

//when i run out of questions it displays my score and asks me to enter my initials.
//when io have eneted my information it sends me to the highscores screen.
