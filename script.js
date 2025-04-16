const questions = [
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Lung"],
    answer: "Skin"
  },
  {
    question: "How many chambers does the human heart have?",
    options: ["2", "3", "4", "5"],
    answer: "4"
  },
  {
    question: "Which bone is the longest in the human body?",
    options: ["Femur", "Humerus", "Tibia", "Fibula"],
    answer: "Femur"
  },
  {
    question: "What part of the brain controls balance?",
    options: ["Cerebellum", "Cerebrum", "Medulla", "Pons"],
    answer: "Cerebellum"
  },
  {
    question: "Which blood cells help fight infection?",
    options: ["Red cells", "Platelets", "White cells", "Plasma"],
    answer: "White cells"
  }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const current = questions[currentQuestionIndex];
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('options');
  const nextBtn = document.getElementById('nextBtn');

  questionText.textContent = `Question ${currentQuestionIndex + 1}: ${current.question}`;
  optionsContainer.innerHTML = '';

  current.options.forEach(option => {
    const label = document.createElement('label');
    label.className = "block bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200";

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = option;
    input.className = "mr-2";
    input.required = true;

    label.appendChild(input);
    label.append(option);
    optionsContainer.appendChild(label);
  });

  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';
}

document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;

  const userAnswer = selected.value;
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  let message = "";

  if (score === 5) {
    message = "🎉 Well done! Perfect score!";
  } else if (score >= 3) {
    message = "👏 Great job!";
  } else {
    message = "👍 Good try! Keep learning!";
  }

  document.getElementById('scoreText').textContent = `${message} You scored ${score} out of ${questions.length}.`;
}
