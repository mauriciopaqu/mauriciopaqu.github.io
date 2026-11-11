console.log("Hello from TAG-ME!");

const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeButton.textContent = "Switch to Dark Mode";
    } else {
        themeButton.textContent = "Switch to Light Mode";
    }
});

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
