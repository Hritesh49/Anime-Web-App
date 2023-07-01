const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultMessageElement = document.getElementById('result-message');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

const triviaQuestions = [
  {
    question: 'What is the highest-grossing anime film of all time?',
    choices: ['Spirited Away', 'Your Name', 'Demon Slayer: Mugen Train', 'Frozen'],
    correctAnswer: 'Demon Slayer: Mugen Train'
  },
  {
    question: 'Which anime series is set in the fictional world of Aincrad?',
    choices: ['Attack on Titan', 'One Piece', 'Sword Art Online', 'My Hero Academia'],
    correctAnswer: 'Sword Art Online'
  },
  {
    question: 'Who is the protagonist of the anime series "One Punch Man"?',
    choices: ['Saitama', 'Naruto Uzumaki', 'Goku', 'Monkey D. Luffy'],
    correctAnswer: 'Saitama'
  },
  {
    question: 'Who is the creator of the anime series "One Piece"?',
    choices: ['Masashi Kishimoto', 'Eiichiro Oda', 'Hajime Isayama', 'Rumiko Takahashi'],
    correctAnswer: 'Eiichiro Oda'
  },
  {
    question: 'In One Piece, Monkey D. Luffy originally sets out with the straw Hat pirates to become the pirate king on which ship?',
    choices: ['Going Merry', 'Jolly Roger', 'Thousand Sunny', 'Ever Darker'],
    correctAnswer: 'Going Merry'
  },
  {
    question: 'Which anime series is set in the world of Amestris?',
    choices: ['Naruto', 'Fullmetal Alchemist', 'Sailor Moon', 'Pokemon'],
    correctAnswer: 'Fullmetal Alchemist'
  },
  {
    question: 'Which one of the following series is about time travel?',
    choices: ['Steins Gate', 'Darker Than Black', 'City Hunter', 'Devilman'],
    correctAnswer: 'Steins Gate'
  },
  {
    question: 'What kind of person is Naruto?',
    choices: ['Knight', 'Ninja', 'Samurai', 'warrior'],
    correctAnswer: 'Ninja'
  },
  {
    question: 'By number, which country has the most anime/manga fans in the world?',
    choices: ['Japan', 'Brazil', 'South Korea', 'United States'],
    correctAnswer: 'United States'
  },
  {
    question: 'In Deathnote, Which institute did L, Near come from?',
    choices: ['St. Jupiter Home', 'The Wammys House', 'Calabrian Children Home', 'Kurn Hatin'],
    correctAnswer: 'The Wammys House'
  }
];

function showQuestion() {
  const question = triviaQuestions[currentQuestionIndex];

  questionElement.textContent = question.question;

  choicesElement.innerHTML = '';
  for (let i = 0; i < question.choices.length; i++) {
    const choice = question.choices[i];
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click', () => checkAnswer(choice));
    choicesElement.appendChild(li);
  }
}

function checkAnswer(selectedChoice) {
  const question = triviaQuestions[currentQuestionIndex];

  if (selectedChoice === question.correctAnswer) {
    score++;
    resultMessageElement.textContent = 'Correct!';
    resultMessageElement.style.color = 'green';
  } else {
    resultMessageElement.textContent = `Wrong! The correct answer is ${question.correctAnswer}`;
    resultMessageElement.style.color = 'red';
  }

  nextButton.style.display = 'block';
  choicesElement.style.pointerEvents = 'none';
}

function nextQuestion() {
  currentQuestionIndex++;
  resultMessageElement.textContent = '';
  nextButton.style.display = 'none';
  choicesElement.style.pointerEvents = 'auto';

  if (currentQuestionIndex < triviaQuestions.length) {
    showQuestion();
  } else {
    finishGame();
  }
}

function finishGame() {
  questionElement.textContent = `You answered ${score} out of ${triviaQuestions.length} questions correctly.`;
  choicesElement.innerHTML = '';
}

showQuestion();
nextButton.addEventListener('click', nextQuestion);
