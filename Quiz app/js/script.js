const questions = [
    {
        question: "What is react?",
        answer: [
            { text: "Library", correct: true },
            { text: "Framework", correct: false },
            { text: "Languge", correct: false },
            { text: "none of these", correct: false }
        ]
    },
    {
        question: "React is Mainly used for?",
        answer: [
            { text: "DSA", correct: false },
            { text: "Client side rendering", correct: false },
            { text: "Single page Application", correct: true },
            { text: "Programming", correct: false }
        ]
    },
    {
        question: "The best way to learn React is?",
        answer: [
            { text: "Through React docs", correct: false },
            { text: "Through Sherians Coding Schools", correct: true },
            { text: "Through Harry", correct: false },
            { text: "Through Apna College", correct: false }
        ]
    },
    {
        "question": "Which hook would you use to perform side effects in functional components?",
        "answer": [
            { "text": "useEffect", "correct": true },
            { "text": "useState", "correct": false },
            { "text": "useContext", "correct": false },
            { "text": "useReducer", "correct": false }
        ]
    },
    {
        "question": "What is JSX in React?",
        "answer": [
            { "text": "A state management library", "correct": false },
            { "text": "A syntax extension for JavaScript", "correct": true },
            { "text": "A CSS framework", "correct": false },
            { "text": "A testing library", "correct": false }
        ]
    },
    {
        "question": "How do you pass data to a child component in React?",
        "answer": [
           
            { "text": "Using state", "correct": false },
            { "text": "Using context", "correct": false },
            { "text": "Using refs", "correct": false },
            { "text": "Using props", "correct": true },
        ]
    }
];

let questionElement = document.getElementById("Question");
// questionElement.innerHTML = ""
let answerButton = document.getElementById("answerButton");
let nextButton = document.getElementById("next-btn");




let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    // nextBtn.style.display = 'none'; // Hide the next button initially
    showQuestion();
}

function showQuestion() {
    resetstate();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
     });
}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Disable all buttons after selection
    const allButtons = document.getElementsByClassName('btn');
    Array.from(allButtons).forEach(button => {
        button.style.cursor = 'no-drop';
        // Disable the button to prevent further clicks
        button.disabled = true; 
    });

    // ShowQuestionshowQuestion the next button
    nextButton.style.display = 'block';
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showQuestionScore();
    }
}


function showQuestionScore() {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    answerButton.innerHTML = ""; // Clear options
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = 'block';
}

startQuiz();
