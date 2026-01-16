
/* ==================================================
   DATA: QUIZ QUESTIONS
   ================================================== */
const questions = [
    { text: "What is the capital of Texas?", options: ["Houston", "Austin", "Dallas", "San Antonio"], correct: 1 },
    { text: "Year of independence?", options: ["1836", "1845", "1900", "1776"], correct: 0 },
    { text: "What is the state bird?", options: ["Eagle", "Mockingbird", "Owl", "Hawk"], correct: 1 },
    { text: "Largest city in Texas?", options: ["Dallas", "Austin", "Houston", "El Paso"], correct: 2 },
    { text: "Texas nickname?", options: ["Lone Star State", "Sunshine State", "Golden State", "Big State"], correct: 0 }
];

let currentQuestionIndex = 0;
let score = 0;

/* ==================================================
   ON PAGE LOAD
   ================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // Greeting
    const introText = document.querySelector('.intro-text');
    if (introText) {
        const hour = new Date().getHours();
        let greeting = "Hi, I'm Marius!";

        if (hour < 12) greeting = "Good morning! I'm Marius.";
        else if (hour < 18) greeting = "Good afternoon! I'm Marius.";
        else greeting = "Good evening! I'm Marius.";

        introText.innerHTML = introText.innerHTML.replace("Hi, I'm Marius!", `<strong>${greeting}</strong>`);
    }

    // Back-to-top button
    const btn = document.createElement('button');
    btn.innerText = "↑";
    btn.className = "back-to-top";
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) btn.classList.add('show');
        else btn.classList.remove('show');
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Lightbox
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img').src;
            const title = card.querySelector('h3').innerText;
            const text = card.querySelector('p').innerText;
            openModal(img, title, text);
        });
    });
});

/* ==================================================
   LIGHTBOX
   ================================================== */
function openModal(imageSrc, title, desc) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imageSrc}" alt="${title}" />
            <h3>${title}</h3>
            <p>${desc}</p>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target.className === 'modal-overlay' || e.target.className === 'close-modal') {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}

/* ==================================================
   ARCADE / GAME LOGIC
   ================================================== */
function showSection(id) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('rps-section').classList.add('hidden');

    document.getElementById(id + '-section').classList.remove('hidden');

    if (id === 'quiz') startQuiz();
}

/* RPS GAME */
function playRPS(playerChoice) {
    const options = ['rock', 'paper', 'scissors'];
    const cpuChoice = options[Math.floor(Math.random() * 3)];
    const resultText = document.getElementById('rps-result');

    if (playerChoice === cpuChoice) {
        resultText.innerText = `It's a Tie! (Both chose ${cpuChoice})`;
        resultText.style.color = "white";
    } else if (
        (playerChoice === 'rock' && cpuChoice === 'scissors') ||
        (playerChoice === 'paper' && cpuChoice === 'rock') ||
        (playerChoice === 'scissors' && cpuChoice === 'paper')
    ) {
        resultText.innerText = `You Win! (${playerChoice} beats ${cpuChoice})`;
        resultText.style.color = "#93e1d8";
        updateScore('p-score');
    } else {
        resultText.innerText = `Computer Wins! (${cpuChoice} beats ${playerChoice})`;
        resultText.style.color = "#ff6b6b";
        updateScore('c-score');
    }
}

function updateScore(id) {
    const el = document.getElementById(id);
    el.innerText = parseInt(el.innerText) + 1;
}

/* QUIZ GAME */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const container = document.getElementById('quiz-content');

    if (currentQuestionIndex >= questions.length) {
        container.innerHTML = `
            <h2>Game Over!</h2>
            <p>You scored ${score} out of ${questions.length}</p>
            <button class="game-btn" onclick="startQuiz()">Play Again</button>
        `;
        return;
    }

    const q = questions[currentQuestionIndex];

    let buttons = "";
    q.options.forEach((opt, index) => {
        buttons += `<button class="game-btn option-btn" onclick="checkAnswer(${index})">${opt}</button>`;
    });

    container.innerHTML = `
        <h3>Question ${currentQuestionIndex + 1}</h3>
        <p class="question-text">${q.text}</p>
        <div class="options-grid">${buttons}</div>
    `;
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].correct) score++;
    currentQuestionIndex++;
    loadQuestion();
}
