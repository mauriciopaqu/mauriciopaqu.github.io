console.log("Hello from TAG-ME!");

// LIGHT / DARK MODE TOGGLE
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

// RANDOM FACT GENERATOR
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

// PERSONALIZED GREETING
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

// GET TO KNOW ME TRIVIA QUIZ
const quizSection = document.getElementById("trivia-quiz");

if (quizSection) {
    // The questions array stores the quiz content and correct answers.
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

    // These variables track the current application state.
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

    // Display one question and create its answer buttons in the DOM.
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

    // Check the selected answer, update the score, and flip the card.
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

    // Move forward or show the final score when the quiz is complete.
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

    // Reveal the final score with a short animation.
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
        // Re-applying the class restarts the score animation.
        finalScore.classList.add("score-reveal");
    }

    // Restart the quiz and reset the application state.
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

    // CLICK events handle answer selection, navigation, and replay.
    nextButton.addEventListener("click", goToNextQuestion);
    restartButton.addEventListener("click", restartQuiz);

    // KEYDOWN events let visitors answer with 1-4 and continue with Enter.
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


// CARTOON PERSONALITY QUIZ: separate feature using the SampleAPIs endpoint.
{
const quizSection = document.getElementById("cartoon-match-quiz");

if (quizSection) {
    // Each answer is connected to a genre that exists in the cartoons API.
    const questions = [
        {
            question: "What sounds like your ideal weekend?",
            options: [
                { text: "Laughing with friends", genre: "Comedy" },
                { text: "Exploring somewhere new", genre: "Adventure" },
                { text: "Trying something exciting", genre: "Action" },
                { text: "Relaxing with people I love", genre: "Family" }
            ]
        },
        {
            question: "Which word describes you best?",
            options: [
                { text: "Funny", genre: "Comedy" },
                { text: "Curious", genre: "Adventure" },
                { text: "Bold", genre: "Action" },
                { text: "Caring", genre: "Family" }
            ]
        },
        {
            question: "Pick the story you would most enjoy:",
            options: [
                { text: "A series of hilarious situations", genre: "Comedy" },
                { text: "A mysterious journey", genre: "Adventure" },
                { text: "A team saving the day", genre: "Action" },
                { text: "Friends growing together", genre: "Drama" }
            ]
        },
        {
            question: "When a problem appears, what do you do?",
            options: [
                { text: "Make a joke and stay positive", genre: "Comedy" },
                { text: "Find a creative way around it", genre: "Adventure" },
                { text: "Face it head-on", genre: "Action" },
                { text: "Talk it through with others", genre: "Family" }
            ]
        },
        {
            question: "Choose the vibe for your own cartoon:",
            options: [
                { text: "Funny and unpredictable", genre: "Comedy" },
                { text: "Imaginative and full of discovery", genre: "Adventure" },
                { text: "Fast-paced and daring", genre: "Action" },
                { text: "Heartwarming and meaningful", genre: "Family" }
            ]
        }
    ];

    const cartoonsAPI = "https://api.sampleapis.com/cartoons/cartoons2D";
    let currentQuestion = 0;
    let selectedGenres = [];
    let answered = false;

    const quizCounter = document.getElementById("cartoon-quiz-counter");
    const progressFill = document.getElementById("cartoon-quiz-progress-fill");
    const quizCard = document.getElementById("cartoon-quiz-card");
    const questionText = document.getElementById("cartoon-quiz-question");
    const optionsContainer = document.getElementById("cartoon-quiz-options");
    const feedbackIcon = document.getElementById("cartoon-quiz-feedback-icon");
    const feedbackTitle = document.getElementById("cartoon-quiz-feedback-title");
    const feedbackText = document.getElementById("cartoon-quiz-feedback-text");
    const runningScore = document.getElementById("cartoon-quiz-running-score");
    const nextButton = document.getElementById("cartoon-quiz-next");
    const quizStage = document.getElementById("cartoon-quiz-stage");
    const quizResult = document.getElementById("cartoon-quiz-result");
    const restartButton = document.getElementById("cartoon-quiz-restart");
    const cartoonLoadingTitle = document.getElementById("cartoon-loading-title");
    const cartoonStatus = document.getElementById("cartoon-status");
    const cartoonResultCard = document.getElementById("cartoon-result-card");
    const cartoonImage = document.getElementById("cartoon-image");
    const cartoonTitle = document.getElementById("cartoon-title");
    const cartoonDescription = document.getElementById("cartoon-description");
    const cartoonFacts = document.getElementById("cartoon-facts");
    const cartoonError = document.getElementById("cartoon-error");
    const retryButton = document.getElementById("cartoon-retry");

    function showQuestion() {
        answered = false;
        quizCard.classList.remove("is-flipped");

        const question = questions[currentQuestion];
        quizCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
        questionText.textContent = question.question;
        optionsContainer.innerHTML = "";

        for (let i = 0; i < question.options.length; i++) {
            const optionButton = document.createElement("button");
            optionButton.type = "button";
            optionButton.classList.add("quiz-option");
            optionButton.textContent = `${i + 1}. ${question.options[i].text}`;
            optionButton.addEventListener("click", function () {
                selectAnswer(i);
            });
            optionsContainer.appendChild(optionButton);
        }
    }

    function selectAnswer(selectedOption) {
        if (answered) {
            return;
        }

        answered = true;
        const question = questions[currentQuestion];
        const selectedAnswer = question.options[selectedOption];
        selectedGenres.push(selectedAnswer.genre);

        feedbackIcon.textContent = "✓";
        feedbackTitle.textContent = "Choice saved!";
        feedbackTitle.classList.remove("quiz-incorrect");
        feedbackTitle.classList.add("quiz-correct");
        feedbackText.textContent = `You chose: ${selectedAnswer.text}. Your answer adds ${selectedAnswer.genre.toLowerCase()} to your cartoon personality.`;
        runningScore.textContent = `Question ${currentQuestion + 1} of ${questions.length} completed`;

        const optionButtons = optionsContainer.querySelectorAll("button");
        for (let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].disabled = true;
            if (i === selectedOption) {
                optionButtons[i].classList.add("correct-answer");
            }
        }

        if (currentQuestion === questions.length - 1) {
            nextButton.textContent = "Reveal My Cartoon!";
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
            findCartoonMatch();
        }
    }

    // Find the genre selected most often, then match it to a cartoon from the API.
    function getPreferredGenre() {
        let bestGenre = selectedGenres[0];
        let highestCount = 0;

        for (let i = 0; i < selectedGenres.length; i++) {
            let count = 0;
            for (let j = 0; j < selectedGenres.length; j++) {
                if (selectedGenres[i] === selectedGenres[j]) {
                    count++;
                }
            }
            if (count > highestCount) {
                highestCount = count;
                bestGenre = selectedGenres[i];
            }
        }
        return bestGenre;
    }

    async function findCartoonMatch() {
        quizStage.hidden = true;
        quizResult.hidden = false;
        progressFill.style.width = "100%";
        cartoonResultCard.hidden = true;
        cartoonError.textContent = "";
        retryButton.hidden = true;
        cartoonLoadingTitle.textContent = "Finding your animated alter ego...";
        cartoonStatus.textContent = "Connecting to the cartoons database. Please wait!";

        try {
            const response = await fetch(cartoonsAPI);

            if (!response.ok) {
                throw new Error("The cartoon service returned an error.");
            }

            const cartoons = await response.json();

            if (!Array.isArray(cartoons) || cartoons.length === 0) {
                throw new Error("No cartoon information was returned.");
            }

            const preferredGenre = getPreferredGenre();
            const matchingCartoons = [];

            // Avoid TV-MA titles and find cartoons that include the preferred genre.
            for (let i = 0; i < cartoons.length; i++) {
                const cartoon = cartoons[i];
                if (cartoon.rating !== "TV-MA" && Array.isArray(cartoon.genre)) {
                    for (let j = 0; j < cartoon.genre.length; j++) {
                        if (cartoon.genre[j].toLowerCase() === preferredGenre.toLowerCase()) {
                            matchingCartoons.push(cartoon);
                            break;
                        }
                    }
                }
            }

            // If the API has no exact genre match, choose from its other non-TV-MA cartoons.
            if (matchingCartoons.length === 0) {
                for (let i = 0; i < cartoons.length; i++) {
                    if (cartoons[i].rating !== "TV-MA") {
                        matchingCartoons.push(cartoons[i]);
                    }
                }
            }

            if (matchingCartoons.length === 0) {
                throw new Error("There are no suitable cartoon results available right now.");
            }

            const randomIndex = Math.floor(Math.random() * matchingCartoons.length);
            const matchedCartoon = matchingCartoons[randomIndex];
            displayCartoon(matchedCartoon, preferredGenre);
        } catch (error) {
            cartoonLoadingTitle.textContent = "We couldn't find your cartoon just yet.";
            cartoonStatus.textContent = "The cartoon information is temporarily unavailable.";
            cartoonError.textContent = "Please check your internet connection and try again.";
            retryButton.hidden = false;
        }
    }

    function displayCartoon(cartoon, preferredGenre) {
        cartoonLoadingTitle.textContent = "Your animated alter ego is...";
        cartoonStatus.textContent = `Your answers leaned toward ${preferredGenre.toLowerCase()}! We found a cartoon with a matching genre.`;
        cartoonResultCard.hidden = false;
        cartoonTitle.textContent = cartoon.title || "A mystery cartoon";
        cartoonDescription.textContent = `This cartoon matches your ${preferredGenre.toLowerCase()} personality. Maybe it's time to add it to your watchlist!`;

        cartoonImage.onerror = function () {
            cartoonImage.hidden = true;
        };
        cartoonImage.hidden = false;
        if (cartoon.image) {
            cartoonImage.src = cartoon.image;
            cartoonImage.alt = `${cartoon.title || "Cartoon"} artwork`;
        } else {
            cartoonImage.hidden = true;
        }

        cartoonFacts.innerHTML = "";
        const facts = [
            `Year: ${cartoon.year || "Not listed"}`,
            `Genre: ${Array.isArray(cartoon.genre) ? cartoon.genre.join(", ") : "Not listed"}`,
            `Creator: ${Array.isArray(cartoon.creator) ? cartoon.creator.join(", ") : "Not listed"}`,
            `TV rating: ${cartoon.rating || "Not listed"}`,
            `Episodes: ${cartoon.episodes || "Not listed"}`
        ];

        for (let i = 0; i < facts.length; i++) {
            const listItem = document.createElement("li");
            listItem.textContent = facts[i];
            cartoonFacts.appendChild(listItem);
        }
    }

    function restartQuiz() {
        currentQuestion = 0;
        selectedGenres = [];
        answered = false;
        quizResult.hidden = true;
        quizStage.hidden = false;
        cartoonResultCard.hidden = true;
        cartoonError.textContent = "";
        retryButton.hidden = true;
        nextButton.textContent = "Next Question";
        showQuestion();
    }

    nextButton.addEventListener("click", goToNextQuestion);
    restartButton.addEventListener("click", restartQuiz);
    retryButton.addEventListener("click", findCartoonMatch);

    showQuestion();
}

}

