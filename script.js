// Define the array of questions, options, and correct answers
const questions = [
  {
    question: "What is the largest organ in the human body?", // Question text
    options: ["Heart", "Liver", "Skin", "Lung"], // List of possible answers
    answer: "Skin" // The correct answer
  },
  {
    question: "How many chambers does the human heart have?", // Question text
    options: ["2", "3", "4", "5"], // List of possible answers
    answer: "4" // The correct answer
  },
  {
    question: "Which bone is the longest in the human body?", // Question text
    options: ["Femur", "Humerus", "Tibia", "Fibula"], // List of possible answers
    answer: "Femur" // The correct answer
  },
  {
    question: "What part of the brain controls balance?", // Question text
    options: ["Cerebellum", "Cerebrum", "Medulla", "Pons"], // List of possible answers
    answer: "Cerebellum" // The correct answer
  },
  {
    question: "Which blood cells help fight infection?", // Question text
    options: ["Red cells", "Platelets", "White cells", "Plasma"], // List of possible answers
    answer: "White cells" // The correct answer
  }
];

// Initialize variables for tracking the current question index and the score
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz by hiding the intro screen and showing the quiz
function startQuiz() {
  document.getElementById("intro").classList.add("hidden"); // Hide the intro screen
  document.getElementById("quiz").classList.remove("hidden"); // Show the quiz screen
  renderQuestion(); // Render the first question
}

// Function to render the current question and options
function renderQuestion() {
  const current = questions[currentQuestionIndex]; // Get the current question object
  const questionText = document.getElementById("questionText"); // Element to display the question
  const optionsContainer = document.getElementById("options"); // Container to hold the options
  const nextBtn = document.getElementById("nextBtn"); // "Next" button

  questionText.textContent = `Question ${currentQuestionIndex + 1}: ${current.question}`; // Display question text
  optionsContainer.innerHTML = ""; // Clear previous options
  nextBtn.disabled = true; // Disable the "Next" button until an answer is selected

  // Loop through each option and create radio buttons for each answer
  current.options.forEach((option) => {
    const label = document.createElement("label"); // Create a new label element
    label.className = "block bg-gray-100 p-2 rounded cursor-pointer mb-2 transition-colors"; // Apply styling

    const input = document.createElement("input"); // Create a new radio input element
    input.type = "radio"; // Set input type to "radio"
    input.name = "answer"; // Group all the radio buttons by name (only one can be selected)
    input.value = option; // Set the option text as the value of the radio button
    input.className = "mr-2"; // Add some margin for the radio button

    // Add event listener to handle the answer selection
    input.addEventListener("change", () => handleAnswer(input));

    label.appendChild(input); // Append the radio button to the label
    label.append(option); // Append the option text to the label
    optionsContainer.appendChild(label); // Append the label to the options container
  });

  // Change the button text to "Submit" if it's the last question, otherwise show "Next"
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
}

// Function to handle the answer selection
function handleAnswer(selectedInput) {
  const selectedAnswer = selectedInput.value; // Get the value of the selected option
  const correctAnswer = questions[currentQuestionIndex].answer; // Get the correct answer
  const allLabels = document.querySelectorAll("#options label"); // Get all labels for the options

  // Loop through each label to apply styles based on the answer
  allLabels.forEach((label) => {
    const input = label.querySelector("input"); // Get the input (radio button) inside the label
    input.disabled = true; // Disable the radio button after an answer is selected

    // If the input value matches the correct answer, set the background to green
    if (input.value === correctAnswer) {
      label.classList.remove("bg-gray-100");
      label.classList.add("bg-green-200");
    }

    // If the input is checked and is incorrect, set the background to red
    if (input.checked && input.value !== correctAnswer) {
      label.classList.remove("bg-gray-100");
      label.classList.add("bg-red-200");
    }
  });

  // If the selected answer is correct, increment the score
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  // Enable the "Next" button after the answer is selected
  document.getElementById("nextBtn").disabled = false;
}

// Event listener for the "Next" button, which moves to the next question or shows results
document.getElementById("nextBtn").addEventListener("click", () => {
  currentQuestionIndex++; // Move to the next question
  if (currentQuestionIndex < questions.length) {
    renderQuestion(); // Render the next question
  } else {
    showResults(); // Show the results if all questions are answered
  }
});

// Function to show the final results after the quiz ends
function showResults() {
  // Hide the quiz screen and show the results screen
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const scoreText = document.getElementById("scoreText"); // Element to display the score text
  let message = ""; // Message to display based on the score

  // Set the message based on the score
  if (score === questions.length) {
    message = "🎉 Well done! Perfect score!"; // If the user got all questions right
  } else if (score >= 3) {
    message = "👏 Great job!"; // If the user scored 3 or more
  } else {
    message = "👍 Good try! Keep learning!"; // If the user scored less than 3
  }

  // Display the message and the user's score
  scoreText.textContent = `${message} You scored ${score} out of ${questions.length}.`;
}
