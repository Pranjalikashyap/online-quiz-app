const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks Text Management Language",
            "Hyper Transfer Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: "CSS"
    },
    {
        question: "Which is not a JavaScript Framework?",
        options: ["Python Script", "JQuery", "Django", "NodeJS"],
        answer: "Django"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "<!--", "**"],
        answer: "//"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option-btn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const finalScoreEl = document.getElementById("final-score");

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.innerText = q.question;
    optionBtns.forEach((btn, index) => {
        btn.innerText = q.options[index];
        btn.disabled = false;
    });
    timeLeft = 30;
    timerEl.innerText = timeLeft;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedBtn) {
    clearInterval(timer);
    const userAnswer = selectedBtn.innerText;
    if (userAnswer === questions[currentQuestion].answer) {
        score += 1;
        scoreEl.innerText = score;
    }
    optionBtns.forEach(btn => btn.disabled = true);
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    finalScoreEl.innerText = `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreEl.innerText = score;
    quizBox.classList.remove("hide");
    resultBox.classList.add("hide");
    startQuiz();
}

startQuiz();
