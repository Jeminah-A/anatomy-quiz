// Array of questions with options and correct answers
const questions = [
    {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Liver", "Skin", "Lung"],
      answer: "Skin",
    },
    {
      question: "Which part of the brain controls balance?",
      options: ["Cerebrum", "Cerebellum", "Medulla", "Pons"],
      answer: "Cerebellum",
    },
    {
      question: "How many chambers are in the human heart?",
      options: ["2", "3", "4", "5"],
      answer: "4",
    },
    {
      question: "Where does digestion begin?",
      options: ["Stomach", "Mouth", "Small intestine", "Liver"],
      answer: "Mouth",
    },
    {
      question: "Which system transports oxygen in the body?",
      options: ["Nervous", "Digestive", "Respiratory", "Circulatory"],
      answer: "Circulatory",
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Stores the user's selected answers
  let userAnswers = [];
  
  function startQuiz() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    renderQuestion();
  }
  
  // Function to render current question
  function renderQuestion() {
    const quizForm = document.getElementById('quizForm');
    quizForm.innerHTML = ''; // Clear previous question
  
    const q = questions[currentQuestionIndex];
  
    const questionText = document.createElement('p');
    questionText.className = "font-medium mb-2";
    questionText.textContent = `Question ${currentQuestionIndex + 1}: ${q.question}`;
    quizForm.appendChild(questionText);
  
    // Create radio options
    q.options.forEach(option => {
      const label = document.createElement('label');
      label.className = "block mt-1";
  
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = option;
      input.required = true;
  
      label.appendChild(input);
      label.append(` ${option}`);
      quizForm.appendChild(label);
    });
  
    // Replace or create next/submit button
    const nextButton = document.createElement('button');
    nextButton.type = 'submit';
    nextButton.className = "mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700";
  
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
  
    quizForm.appendChild(nextButton);
  }
  
  document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get selected answer
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;
  
    userAnswers.push(selected.value);
  
    // Check if answer is correct
    if (selected.value === questions[currentQuestionIndex].answer) {
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
    document.getElementById('scoreText').textContent = `You scored ${score} out of ${questions.length}.`;
  }
  