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
    question: "What is the airspeed velocity of the average unladen Swallow?",
    answers: ["17.8 MPH", "20.1 MPH", "45.6 MPH", "4 MPH"],
    correctAnswer: "20.1 MPH",
  },
  {
    question: "What is the diameter of the Sun in miles?",
    answers: ["1028.4 Miles", "485.86 Miles", "930.25 Miles", "1101.01 Miles"],
    correctAnswer: "930.25 Miles",
  },
  {
    question: "What is the capitol of Assyria?",
    answers: ["Assur", "Yangiyul", "Poland", "Tashkent"],
    correctAnswer: "Assur",
  },
  // Add more questions as needed
];
var highscore;
var initialsStore;
const highscoresList = $("#highscores-list");
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
      window.currentQuestion = 0;
      $("#initials").val("");
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
  displayScores(); // Load highscores when the highscores screen is displayed
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
}
$("#submit-btn").click(function () {
  if (initials === "") {
    alert("error. initials cannot be blank");
  }
  if (initials !== "") {
    alert("success. Registered successfully");
    var initialsStore = $("#initials").val();
    console.log(initialsStore);
    window.highscore = initialsStore;

    const savedHighscores =
      JSON.parse(localStorage.getItem("highscores")) || [];
    savedHighscores.push({ initials: highscore, score });
    savedHighscores.sort((a, b) => b.score - a.score); // Sort highscores in descending order

    localStorage.setItem("highscores", JSON.stringify(savedHighscores));
    window.highscore;
    window.initialsStore;
    window.score = 0;
    window.currentQuestion = 0;
    window.timeInterval;
    window.times;
    displayScores();
    showHighscores();
  }
});

function displayScores() {
  const savedHighscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscoresList.empty();
  savedHighscores.forEach((entry, index) => {
    highscoresList.append(
      `<li>${index + 1}. ${entry.initials} - ${entry.score}</li>`
    );
  });
  window.score = 0;
}
//when io have eneted my information it sends me to the highscores screen.
