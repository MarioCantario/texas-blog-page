document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DYNAMIC GREETING (For index.html only) ---
    const introText = document.querySelector('.intro-text');
    if (introText) {
        const hours = new Date().getHours();
        let greeting = "Hi, I'm Marius!";
        
        if (hours < 12) greeting = "Good morning! I'm Marius.";
        else if (hours < 18) greeting = "Good afternoon! I'm Marius.";
        else greeting = "Good evening! I'm Marius.";
        
        // Fix: Use template literal with backticks
        const restOfText = introText.innerHTML.split("Marius!")[1] || "";
        introText.innerHTML = `<strong>${greeting}</strong>${restOfText}`;
    }

    // --- 2. BACK TO TOP BUTTON ---
    const backToTop = document.createElement('button');
    backToTop.innerHTML = "↑";
    backToTop.className = "back-to-top";
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 3. MODAL LIGHTBOX (For places.html) ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const imgSrc = img ? img.src : '';
            const title = card.querySelector('h3')?.innerText || 'No title';
            const text = card.querySelector('p')?.innerText || 'No description';

            showModal(imgSrc, title, text);
        });
    });

    function showModal(src, title, text) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        // Fixed template literal with proper backticks and ${}
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${src}" alt="${title}">
                <h3>${title}</h3>
                <p>${text}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal')) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Quiz about Texas fun questions, questions randomized 
function startQuiz() {
    const userName = prompt("Welcome to the Texas Quiz! Please enter your name:");
    if (!userName) return;
    
    alert(`Hello ${userName}! Let's test your Texas knowledge!`);
    let score = 0;
    const questions = [
        {
            question: "What is the capital of Texas?",
            options: ["Houston", "Austin", "Dallas", "San Antonio"],
            answer: 1
        },
        {
            question: "What year did Texas become independent?",
            options: ["1836", "1845", "1865", "1901"],
            answer: 0
        },
        {
            question: "Which famous battle happened in Texas in 1836?",
            options: ["Battle of San Antonio", "Battle of the Alamo", "Battle of Galveston", "Battle of Corpus Christi"],
            answer: 1
        },
        {
            question: "What is the largest city in Texas?",
            options: ["Dallas", "Austin", "Houston", "San Antonio"],
            answer: 2
        },
        {
            question: "Which river forms the border between Texas and Mexico?",
            options: ["Colorado River", "Brazos River", "Rio Grande", "Trinity River"],
            answer: 2
        },
        {
            question: "What is Texas known as?",
            options: ["The Lone Star State", "The Great State", "The Frontier State", "The Oil State"],
            answer: 0
        },
        {
            question: "Which president was from Texas?",
            options: ["Theodore Roosevelt", "Dwight Eisenhower", "Lyndon B. Johnson", "Gerald Ford"],
            answer: 2
        },
        {
            question: "What is the state bird of Texas?",
            options: ["American Eagle", "Northern Mockingbird", "Texas Sparrow", "Longhorn Owl"],
            answer: 1
        },
        {
            question: "Which NASA facility is located in Texas?",
            options: ["Kennedy Space Center", "Johnson Space Center", "Cape Canaveral", "Marshall Space Flight Center"],
            answer: 1
        },
        {
            question: "What is the state food of Texas?",
            options: ["Barbecue", "Chili", "Tex-Mex", "Texas Toast"],
            answer: 1
        }
    ];
    
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    
    shuffled.forEach((q, i) => {
        const userAnswer = prompt(`${i + 1}. ${q.question}\n\n${q.options.map((opt, idx) => `${idx}: ${opt}`).join("\n")}`);
        if (userAnswer === null) return;
        const answerIndex = parseInt(userAnswer);
        if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= q.options.length) {
            alert("Invalid answer. Please enter a valid option number.");
            return;
        }
        if (answerIndex === q.answer) {
            score++;
            alert("✓ Correct!");
        } else {
            alert(`✗ Wrong! The correct answer was: ${q.options[q.answer]}`);
        }
    });
    
    alert(`Quiz over! ${userName}, your final score is: ${score} out of ${shuffled.length}`);
}
