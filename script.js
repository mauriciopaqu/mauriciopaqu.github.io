console.log("Hello from TAG-ME!");

const themeButton = document.getElementById("theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeButton.textContent = "Switch to Dark Mode";
        } else {
            themeButton.textContent = "Switch to Light Mode";
        }
    });
}


const facts = [
    "I am color blind, so sometimes I mistake a yellow T-shirt for bright green.",
    "I love horror video games and movies.",
    "I have a popular second Instagram account that I prefer to keep hidden.",
    "I can have random food cravings at unexpected times.",
    "One of my ambitions is to create my own digital media agency.",
    "I dream of having a home that combines futuristic design with warmth and coziness."
];

const factButton = document.getElementById("fact-button");
const factDisplay = document.getElementById("fact-display");

if (factButton) {
    factButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * facts.length);
        factDisplay.textContent = facts[randomIndex];
    });
}


const greetButton = document.getElementById("greet-button");
const nameInput = document.getElementById("visitor-name");
const greetingMessage = document.querySelector("#greeting-message");

if (greetButton) {
    greetButton.addEventListener("click", function () {
        const visitorName = nameInput.value.trim();

        if (visitorName === "") {
            greetingMessage.textContent = "Please enter your name first.";
        } else {
            greetingMessage.textContent = `Hello, ${visitorName}! Welcome to my website.`;
        }
    });
}

const quizSection = document.getElementById("trivia-quiz");

if (quizSection) {
  
    const questions = [
        {
            question: "What colour might I mistake a yellow T-shirt for?",
            options: ["Bright green", "Bright blue", "Orange", "Purple"],
            answer: 0,
            feedback: "I sometimes mistake yellow for bright green. Fashion can be a surprise!"
        },
        {
            question: "What kind of movies and video games do I enjoy?",
            options: ["Romance", "Horror", "Sports", "Cooking"],
            answer: 1,
            feedback: "Horror is my thing. I enjoy suspense, creepy stories, and unexpected jump scares."
        },
        {
            question: "Which social media account do I prefer to keep hidden?",
            options: ["My first Instagram account", "A public YouTube channel", "My second Instagram account", "A photography blog"],
            answer: 2,
            feedback: "I have a popular second Instagram account, but I prefer to keep it private."
        },
        {
            question: "How would I describe my dream home?",
            options: ["Traditional and rustic", "Industrial and minimal", "Bright and tropical", "Futuristic, warm, and cozy"],
            answer: 3,
            feedback: "I imagine a home that feels like the future but still feels warm and cozy."
        },
        {
            question: "What kind of business would I love to create?",
            options: ["A restaurant", "A digital media agency", "A clothing store", "A travel agency"],
            answer: 1,
            feedback: "One of my ambitions is to build a digital media agency focused on creative content and communication."
        },
        {
            question: "What matters to me when working with others?",
            options: ["Clear communication, trust, and respect", "Strict competition", "Working without a plan", "Avoiding feedback"],
            answer: 0,
            feedback: "My survival guide is simple: communicate clearly, build trust, and always show respect."
        }
    ];


    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const quizCounter = document.getElementById("quiz-counter");
    const progressFill = document.getElementById("quiz-progress-fill");
    const quizCard = document.getElementById("quiz-card");
    const questionText = document.getElementById("quiz-question");
    const optionsContainer = document.getElementById("quiz-options");
    const feedbackIcon = document.getElementById("quiz-feedback-icon");
    const feedbackTitle = document.getElementById("quiz-feedback-title");
    const feedbackText = document.getElementById("quiz-feedback-text");
    const runningScore = document.getElementById("quiz-running-score");
    const nextButton = document.getElementById("quiz-next");
    const quizStage = document.getElementById("quiz-stage");
    const quizResult = document.getElementById("quiz-result");
    const finalScore = document.getElementById("quiz-final-score");
    const resultMessage = document.getElementById("quiz-result-message");
    const restartButton = document.getElementById("quiz-restart");


    function showQuestion() {
        answered = false;
        quizCard.classList.remove("is-flipped");

        const question = questions[currentQuestion];
        quizCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
        questionText.textContent = question.question;
        optionsContainer.innerHTML = "";

        for (let i = 0; i < question.options.length; i++) {
            const optionButton = document.createElement("button");
            optionButton.type = "button";
            optionButton.classList.add("quiz-option");
            optionButton.textContent = `${i + 1}. ${question.options[i]}`;
            optionButton.addEventListener("click", function () {
                checkAnswer(i);
            });
            optionsContainer.appendChild(optionButton);
        }
    }

    function checkAnswer(selectedOption) {
        if (answered) {
            return;
        }

        answered = true;
        const question = questions[currentQuestion];

        if (selectedOption === question.answer) {
            score++;
            feedbackIcon.textContent = "✓";
            feedbackTitle.textContent = "That's right!";
            feedbackTitle.classList.remove("quiz-incorrect");
            feedbackTitle.classList.add("quiz-correct");
        } else {
            feedbackIcon.textContent = "↻";
            feedbackTitle.textContent = "Not quite!";
            feedbackTitle.classList.remove("quiz-correct");
            feedbackTitle.classList.add("quiz-incorrect");
        }

        feedbackText.textContent = question.feedback;
        runningScore.textContent = `Your score: ${score} / ${currentQuestion + 1}`;

        const optionButtons = optionsContainer.querySelectorAll("button");
        for (let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].disabled = true;
            if (i === question.answer) {
                optionButtons[i].classList.add("correct-answer");
            } else if (i === selectedOption) {
                optionButtons[i].classList.add("wrong-answer");
            }
        }

        if (currentQuestion === questions.length - 1) {
            nextButton.textContent = "See My Final Score";
        } else {
            nextButton.textContent = "Next Question";
        }

        quizCard.classList.add("is-flipped");
    }

    
    function goToNextQuestion() {
        if (!answered) {
            return;
        }

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showFinalScore();
        }
    }

   
    function showFinalScore() {
        quizStage.hidden = true;
        quizResult.hidden = false;
        progressFill.style.width = "100%";
        finalScore.textContent = `${score} / ${questions.length}`;

        if (score === questions.length) {
            resultMessage.textContent = "Perfect score! You really paid attention to the classified files.";
        } else if (score >= 4) {
            resultMessage.textContent = "Great job! You know quite a bit about me.";
        } else if (score >= 2) {
            resultMessage.textContent = "Not bad! Maybe take another look around the page.";
        } else {
            resultMessage.textContent = "Looks like you need another classified briefing. Give it another try!";
        }

        finalScore.classList.remove("score-reveal");
   
        finalScore.classList.add("score-reveal");
    }


    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        answered = false;
        quizResult.hidden = true;
        quizStage.hidden = false;
        finalScore.classList.remove("score-reveal");
        nextButton.textContent = "Next Question";
        showQuestion();
    }

  
    nextButton.addEventListener("click", goToNextQuestion);
    restartButton.addEventListener("click", restartQuiz);

  
    document.addEventListener("keydown", function (event) {
        if (quizResult.hidden === false) {
            if (event.key === "Enter") {
                restartQuiz();
            }
        } else if (!answered && event.key >= "1" && event.key <= "4") {
            checkAnswer(Number(event.key) - 1);
        } else if (answered && event.key === "Enter") {
            goToNextQuestion();
        }
    });

    showQuestion();
}
