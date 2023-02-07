// Questions
var questions = [
  {
    question: 'The full form of CSS is:',
    choices: [
      'Cascading Style Sheets',
      'Colored Special Sheets',
      'Color and Style Sheets',
      'None of them',
    ],
    answer: 'Cascading Style Sheets',
  },
  {
    question: 'How can we change the background color of an element?',
    choices: ['color', 'background-color', 'bg-color', 'color-property'],
    answer: 'background-color',
  },
  {
    question: 'Which of the following properties is used to align text in CSS?',
    choices: ['text-align', 'text-alignment', 'text', 'text-position'],
    answer: 'text-align',
  },
  {
    question: 'What is the general syntax of writing the var() function?',
    choices: [
      'var(--name, value)',
      'var(--name)',
      'var(value)',
      'var(value, --name)',
    ],
    answer: 'var(--name, value)',
  },
]

// variables declarations
var score = 0
var currentQuestion = -1
var timeLeft = 0
var timer

// timer function
function start() {
  timeLeft = 75
  document.getElementById('timeLeft').innerHTML = timeLeft

  timer = setInterval(function () {
    timeLeft--
    document.getElementById('timeLeft').innerHTML = timeLeft

    // when timer stops
    if (timeLeft <= 0) {
      clearInterval(timer)
      allDone()
    }
  }, 1000)
  next()
}

function allDone() {
  clearInterval(timer)

  var quizContent =
    `<h2>All done 👏🏼!</h2>
  <h3> Your final score is ` +
    score +
    ` /100!</h3>
  <h3> you answered ` +
    score / 22 +
    ` questions correct!</h3>
  <input type="text" id="name" placeholder="Enter your initials here">
  <button onclick="submit()">Submit ☑️</button>`

  document.getElementById('quizBody').innerHTML = quizContent
}

// localStorage
function submit() {
  localStorage.setItem('highscore', score)
  localStorage.setItem('highscoreName', document.getElementById('name').value)
  getScore()
}

// Score function
function getScore() {
  var quizContent =
    ` 
    <h2> ` +
    localStorage.getItem('highscoreName') +
    `'s Highscore is:</h2>
    <h1> ` +
    localStorage.getItem('highscore') +
    `</h1><br>
    <button onclick="resetGame()">Play again!</button>`

  document.getElementById('quizBody').innerHTML = quizContent
}

// Reset Quiz
function resetGame() {
  clearInterval(timer)
  score = 0
  currentQuestion = -1
  timeLeft = 0
  timer = null

  document.getElementById('timeLeft').innerHTML = timeLeft

  var quizContent = ` 
    <h1>Quiz Challenge</h1>
    <h3>Click Below to Start the Quiz</h3>
    <button onclick="srart()">CLICK TO START 🔥</button>
`
  document.getElementById('quizBody').innerHTML = quizContent
}

// if wrong answer given ... decrement
function wrong() {
  timeLeft -= 5
  next()
}

// if wrong answer given ... increment
function correct() {
  score += 22
  next()
}

// loop
function next() {
  currentQuestion++

  if (currentQuestion > questions.length - 1) {
    allDone()
    return
  }
  var quizContent = '<h2>' + questions[currentQuestion].question + '</h2>'

  for (
    var buttonLoop = 0;
    buttonLoop < questions[currentQuestion].choices.length;
    buttonLoop++
  ) {
    var buttonCode = "<button onclick='[ANS]'>[CHOICE]</button>"
    buttonCode = buttonCode.replace(
      '[CHOICE]',
      questions[currentQuestion].choices[buttonLoop]
    )

    if (
      questions[currentQuestion].choices[buttonLoop] ==
      questions[currentQuestion].answer
    ) {
      buttonCode = buttonCode.replace('[ANS]', 'correct()')
    } else {
      buttonCode = buttonCode.replace('[ANS]', 'wrong()')
    }
    quizContent += buttonCode
  }

  document.getElementById('quizBody').innerHTML = quizContent
}
