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


// POKÉMON PERSONALITY QUIZ: a separate feature using the free PokéAPI.
{
    const questions = [
        {
            question: "How do you usually spend a free afternoon?",
            options: [
                { text: "Trying something exciting and active", type: "electric" },
                { text: "Relaxing somewhere peaceful", type: "water" },
                { text: "Going on an adventure", type: "fire" },
                { text: "Creating or imagining something", type: "psychic" }
            ]
        },
        {
            question: "Which quality describes you best?",
            options: [
                { text: "Energetic and spontaneous", type: "electric" },
                { text: "Calm and thoughtful", type: "water" },
                { text: "Brave and determined", type: "fire" },
                { text: "Creative and curious", type: "psychic" }
            ]
        },
        {
            question: "Choose a place where you would feel happiest.",
            options: [
                { text: "A lively city full of things to do", type: "electric" },
                { text: "A quiet beach or lake", type: "water" },
                { text: "A mountain trail waiting to be explored", type: "fire" },
                { text: "A mysterious library or art studio", type: "psychic" }
            ]
        },
        {
            question: "When facing a challenge, what do you do?",
            options: [
                { text: "Act quickly and adapt", type: "electric" },
                { text: "Stay patient and think it through", type: "water" },
                { text: "Face it head-on", type: "fire" },
                { text: "Find an unusual solution", type: "psychic" }
            ]
        },
        {
            question: "What would your friends say you bring to a group?",
            options: [
                { text: "Energy and excitement", type: "electric" },
                { text: "Support and balance", type: "water" },
                { text: "Confidence and motivation", type: "fire" },
                { text: "Ideas and imagination", type: "psychic" }
            ]
        }
    ];

    const typeCache = {};
    const pokemonCache = {};

    let currentQuestion = 0;
    let selectedTypes = [];
    let answered = false;

    const quizCounter = document.getElementById("pokemon-quiz-counter");
    const progressFill = document.getElementById("pokemon-quiz-progress-fill");
    const quizCard = document.getElementById("pokemon-quiz-card");
    const questionText = document.getElementById("pokemon-quiz-question");
    const optionsContainer = document.getElementById("pokemon-quiz-options");
    const feedbackIcon = document.getElementById("pokemon-quiz-feedback-icon");
    const feedbackTitle = document.getElementById("pokemon-quiz-feedback-title");
    const feedbackText = document.getElementById("pokemon-quiz-feedback-text");
    const runningScore = document.getElementById("pokemon-quiz-running-score");
    const nextButton = document.getElementById("pokemon-quiz-next");
    const quizStage = document.getElementById("pokemon-quiz-stage");
    const quizResult = document.getElementById("pokemon-quiz-result");
    const restartButton = document.getElementById("pokemon-quiz-restart");
    const loadingTitle = document.getElementById("pokemon-loading-title");
    const statusText = document.getElementById("pokemon-status");
    const resultCard = document.getElementById("pokemon-result-card");
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonTitle = document.getElementById("pokemon-title");
    const pokemonDescription = document.getElementById("pokemon-description");
    const pokemonFacts = document.getElementById("pokemon-facts");
    const errorText = document.getElementById("pokemon-error");
    const retryButton = document.getElementById("pokemon-retry");

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
        if (answered) return;

        answered = true;
        const selectedAnswer = questions[currentQuestion].options[selectedOption];
        selectedTypes.push(selectedAnswer.type);

        feedbackIcon.textContent = "✓";
        feedbackTitle.textContent = "Choice saved!";
        feedbackText.textContent = `Your answer adds ${selectedAnswer.type} energy to your personality.`;
        runningScore.textContent = `Question ${currentQuestion + 1} of ${questions.length} completed`;

        const optionButtons = optionsContainer.querySelectorAll("button");
        for (let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].disabled = true;
            if (i === selectedOption) optionButtons[i].classList.add("correct-answer");
        }

        nextButton.textContent = currentQuestion === questions.length - 1
            ? "Reveal My Pokémon!"
            : "Next Question";
        quizCard.classList.add("is-flipped");
    }

    function getPreferredType() {
        const counts = {};
        let preferredType = selectedTypes[0];
        let highestCount = 0;

        for (let i = 0; i < selectedTypes.length; i++) {
            const type = selectedTypes[i];
            counts[type] = (counts[type] || 0) + 1;
            if (counts[type] > highestCount) {
                highestCount = counts[type];
                preferredType = type;
            }
        }
        return preferredType;
    }

    async function getPokemonForType(type) {
        if (!typeCache[type]) {
            const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            if (!typeResponse.ok) throw new Error("PokéAPI could not load that Pokémon type.");
            typeCache[type] = await typeResponse.json();
        }

        const pokemonList = typeCache[type].pokemon;
        if (!pokemonList || pokemonList.length === 0) {
            throw new Error("No Pokémon were found for that type.");
        }

        const choice = pokemonList[Math.floor(Math.random() * pokemonList.length)].pokemon;
        const pokemonName = choice.name;

        if (!pokemonCache[pokemonName]) {
            const pokemonResponse = await fetch(choice.url);
            if (!pokemonResponse.ok) throw new Error("PokéAPI could not load the selected Pokémon.");
            pokemonCache[pokemonName] = await pokemonResponse.json();
        }

        return pokemonCache[pokemonName];
    }

    async function findPokemonMatch() {
        quizStage.hidden = true;
        quizResult.hidden = false;
        progressFill.style.width = "100%";
        resultCard.hidden = true;
        errorText.textContent = "";
        retryButton.hidden = true;
        loadingTitle.textContent = "Finding your Pokémon...";
        statusText.textContent = "Connecting to PokéAPI. Please wait!";

        try {
            const preferredType = getPreferredType();
            const pokemon = await getPokemonForType(preferredType);
            displayPokemon(pokemon, preferredType);
        } catch (error) {
            loadingTitle.textContent = "We couldn't find your Pokémon just yet.";
            statusText.textContent = "The Pokémon information is temporarily unavailable.";
            errorText.textContent = "Please check your internet connection and try again.";
            retryButton.hidden = false;
            console.error("PokéAPI request failed:", error);
        }
    }

    function displayPokemon(pokemon, preferredType) {
        const artwork = pokemon.sprites.other["official-artwork"].front_default
            || pokemon.sprites.front_default;

        loadingTitle.textContent = "Your Pokémon match is...";
        statusText.textContent = `Your answers leaned toward the ${preferredType} type!`;
        resultCard.hidden = false;
        pokemonTitle.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        pokemonDescription.textContent =
            `You matched with this ${preferredType}-type Pokémon. Its abilities and characteristics make it your personality match!`;

        pokemonImage.onerror = function () {
            pokemonImage.hidden = true;
        };
        if (artwork) {
            pokemonImage.src = artwork;
            pokemonImage.alt = `${pokemon.name} official artwork`;
            pokemonImage.hidden = false;
        } else {
            pokemonImage.hidden = true;
        }

        pokemonFacts.innerHTML = "";
        const types = pokemon.types.map(item => item.type.name).join(", ");
        const abilities = pokemon.abilities.map(item =>
            item.ability.name.replace("-", " ")
        ).join(", ");
        const facts = [
            `Pokédex number: #${String(pokemon.id).padStart(3, "0")}`,
            `Type: ${types}`,
            `Abilities: ${abilities}`,
            `Height: ${(pokemon.height / 10).toFixed(1)} m`,
            `Weight: ${(pokemon.weight / 10).toFixed(1)} kg`
        ];

        for (let i = 0; i < facts.length; i++) {
            const listItem = document.createElement("li");
            listItem.textContent = facts[i];
            pokemonFacts.appendChild(listItem);
        }
    }

    function goToNextQuestion() {
        if (!answered) return;
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            findPokemonMatch();
        }
    }

    function restartQuiz() {
        currentQuestion = 0;
        selectedTypes = [];
        answered = false;
        quizResult.hidden = true;
        quizStage.hidden = false;
        resultCard.hidden = true;
        errorText.textContent = "";
        retryButton.hidden = true;
        nextButton.textContent = "Next Question";
        showQuestion();
    }

    nextButton.addEventListener("click", goToNextQuestion);
    restartButton.addEventListener("click", restartQuiz);
    retryButton.addEventListener("click", findPokemonMatch);

    // Render the first question immediately; PokéAPI is only used after all five answers.
    showQuestion();
}
