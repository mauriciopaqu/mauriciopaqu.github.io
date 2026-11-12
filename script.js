console.log("Hello from TAG-ME!");

// light and dark mode
const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeButton.textContent = "Switch to Dark Mode";
    } else {
        themeButton.textContent = "Switch to Light Mode";
    }
});

// generatorr
const facts = [
    "I am an overthinker and that's why I like to be distracted",
    "I like matcha latte (sorry... I'm not pretending)",
    "Skincare is my way of relaxing!",
    "I loooove hotpot! Wanna join?",
    "I have a dog named Archie... Woof!",
    "I like playing Resident Evil! Do you like it?"
];

const factButton = document.getElementById("fact-button");
const factDisplay = document.getElementById("fact-display");

if (factButton) {
    factButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * facts.length);
        factDisplay.textContent = facts[randomIndex];
    });
}

// greeting
const greetButton = document.getElementById("greet-button");
const nameInput = document.getElementById("visitor-name");
const greetingMessage = document.querySelector("#greeting-message");

if (greetButton) {
    greetButton.addEventListener("click", function () {
        const visitorName = nameInput.value.trim();

        if (visitorName === "") {
            greetingMessage.textContent = "Please enter your name first.";
        } else {
            greetingMessage.textContent = `Hello, ${visitorName}! Welcome to my website!`;
        }
    });
}
