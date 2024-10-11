const quizData = [
    {
        question: "How many talking birds have appeared in The Seven Wonders so far?",
        options: ["1", "2", "3", "4"],
        correct: "2",
        explanation: "Groucho, the sassy owl, and Sasspero, the record-keeping parrot!",
    },
    {
        question: "To which goddess is Cédric the Champion?",
        options: ["Athena", "Artemis", "Aphrodite", "Hera"],
        correct: "Artemis",
        explanation: "As it was foretold long ago, Cédric rebuild her temple.",
    },
    {
        question: "What is the name of Circe's cat?",
        options: ["Godzilla", "Fatzilla", "Gorilla", "Catzilla"],
        correct: "Catzilla",
        explanation: "The world's hungriest and cuddliest Trojan cat!",
    },
    {
        question: "On which Greek island was Cédric transformed into his mini, cute-as-hell version?",
        options: ["Rhodes", "Kos", "Aeaea", "Ikaria"],
        correct: "Rhodes",
        explanation: "He was so cute that everyone couldn't help but sigh!",
    },
    {
        question: "The title of one episode in Cédric and Ioanna's Japanese escapades is 'The Samurai &...'",
        options: ["The Village Idiot", "The Tanuki", "The Discounted Temu Barbie", "The Alley Cat"],
        correct: "The Tanuki",
        explanation: "The Japanese humidity had made Ioanna particularly fluffy!",
    },
    {
        question: "What makes Triton ugly-cry?",
        options: ["His daddy issues.", "Korean Fish Dramas", "Ioanna's singing voice!", "Water...There is just too much of it!"],
        correct: "Ioanna's singing voice!",
        explanation: "It's so bad, but that's what makes it so good! ",
    },
    {
        question: "Which song does Ioanna sing to summon Poseidon?",
        options: ["Kung-Fu Figthing by Carl Douglas.", "Daddy Cool by Boney M.", "Pussy Cat by Cy Coleman", "Atlantis Is Calling (S.O.S. for Love) by Modern Talking"],
        correct: "Atlantis Is Calling (S.O.S. for Love) by Modern Talking",
        explanation: "🎵Oh, oh, oh, little queenie .I'm your fool, come on...🎵",
    },
    {
        question: "Apart from Cédric, who else has a PhD in the story?",
        options: [
            "Zeus! The ruler of Olympus must be an expert...Right?",
            "Groucho. With a PhD in sass.",
            "Athena. She plays the knowledgeable, so she must be one.",
            "Cédric's Hair!"
        ],
        correct: "Cédric's Hair!",
        explanation: "Cédric's hair have done its own dissertation in...style!",
    },
    {
        question: "When his students call, he answers! What is Cédric's signal?",
        options: ["A bat! He is the nocturnal vigilante!", "A focaccia!", "An obscure electrochemistry sign!", "An owl! The symbol of wisdom!"],
        correct: "A focaccia!",
        explanation: "Nom ,nom ,nom...The tasty U.F.O. looking bread he nails everytime!",
    },
    {
        question: "What class does Ioanna play?",
        options: ["With her voice? A bard, of course!", "A druid-healer, milord! At your service!", "Have you seen her hair? A barbarian!", "A sorceress! Circe even asked her for an autograph..."],
        correct: "A druid-healer, milord! At your service!",
        explanation: "She makes boo-boos go away!",
    },
    {
        question: "Which physical feature of Cédric makes females babble?",
        options: ["His silky hair,because it is like...silk!", "His croissant-abs. They are buttery, making everyone go...nom nom nom!", "His emerald eyes!", "His PowerPoint Presentantions! Have you seen those things? 🥵"],
        correct: "His emerald eyes!",
        explanation: "They short-circuit you and make you go...ga ga gou gou!",
    },
    {
        question: "What is Ioanna's favorite war cry?",
        options: ["Glou Glou Glou! Like an angry turkey!", "Yodel-ay-ee-oo!Yodel-ay-hee-hoo! Drawing power from the yodlers of the Alps!", "Ya! Ya! Ya!", "Oh là là! The stylish war cry!"],
        correct: "Ya! Ya! Ya!",
        explanation: "The war cry of a true prozor...attackor!",
    },
];

let currentQuestionIndex = 0;
let score = 0;
let randomizedQuestions = [];

const descriptions = {
    low: "Oh mon dieu! 😱",
    medium: "Eh ben, this isn't shabby at all!😎",
    high: "Oh là là! You're a true Seven Wonders connoisseur! 🏆"
};

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const explanationElement = document.getElementById("explanation");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultElement = document.getElementById("result");
const quizContainer = document.getElementById("quiz-container");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.textContent = '';
    nextButton.style.display = 'none';
    restartButton.style.display = 'none';
    quizContainer.style.display = 'block';
    resultElement.style.display = 'none';
    startScreen.style.display = 'none';
    
    randomizedQuestions = [...quizData];
    shuffleArray(randomizedQuestions);
    randomizedQuestions = randomizedQuestions.slice(0, 7);
    
    showQuestion();
}

function showQuestion() {
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    explanationElement.textContent = '';
    explanationElement.classList.remove('loading');
    explanationElement.classList.add('hidden');

    nextButton.style.display = 'none';

    // Create buttons for all options first
    const buttons = currentQuestion.options.map(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-button';
        button.onclick = () => selectAnswer(option);
        return button;
    });

    // Find the widest button
    const maxWidth = Math.max(...buttons.map(button => {
        optionsElement.appendChild(button);
        const width = button.offsetWidth;
        optionsElement.removeChild(button);
        return width;
    }));

    // Set all buttons to the maximum width and append them
    buttons.forEach(button => {
        button.style.width = `${maxWidth}px`;
        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct;

    explanationElement.classList.remove('hidden');
    explanationElement.classList.add('loading');

    setTimeout(() => {
        if (isCorrect) {
            score++;
            explanationElement.textContent = `Correct! ${currentQuestion.explanation}`;
        } else {
            explanationElement.textContent = `Incorrect. The correct answer is ${currentQuestion.correct}. ${currentQuestion.explanation}`;
        }
        explanationElement.classList.remove('loading');

        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === currentQuestion.correct) {
                button.style.backgroundColor = '#4CAF50';
            } else if (button.textContent === selectedOption && !isCorrect) {
                button.style.backgroundColor = '#F44336';
            }
        });

        nextButton.style.display = 'block';
    }, 1000);
}

function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < randomizedQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    let scoreDescription;
    if (score <= 3) {
        scoreDescription = descriptions.low;
    } else if (score <= 6) {
        scoreDescription = descriptions.medium;
    } else {
        scoreDescription = descriptions.high;
    }

    resultElement.innerHTML = `You scored ${score} out of 7.<br><br>${scoreDescription}`;
    restartButton.style.display = 'block';
    nextButton.style.display = 'none';
    quizContainer.style.display = 'none';
    resultElement.style.display = 'block';
}

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', () => {
    quizContainer.style.display = 'none';
    resultElement.style.display = 'none';
    startScreen.style.display = 'block';
});

function restartQuiz() {
    quizContainer.style.display = 'none';
    resultElement.style.display = 'none';
    startScreen.style.display = 'block';
    restartButton.style.display = 'none'; // Hide restart button
    startButton.style.display = 'block'; // Show start button
}

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Initialize the quiz
function initQuiz() {
    startScreen.style.display = 'block';
    quizContainer.style.display = 'none';
    resultElement.style.display = 'none';
    restartButton.style.display = 'none';
    startButton.style.display = 'block';
}

// Call initQuiz when the page loads
window.addEventListener('load', initQuiz);

// Croissant animation logic
const maxCroissants = 4;
let activeCroissants = 0;

function createCroissant() {
    if (activeCroissants >= maxCroissants) return;
    
    const croissantContainer = document.getElementById('croissant-container');
    const croissant = document.createElement('span');
    croissant.classList.add('croissant');
    croissant.textContent = '🥐';

    croissant.style.left = `${Math.random() * 100}vw`;
    const duration = Math.random() * 10 + 15; // 15 to 25 seconds
    croissant.style.animationDuration = `${duration}s`;
    
    croissantContainer.appendChild(croissant);
    activeCroissants++;

    croissant.addEventListener('animationiteration', () => {
        croissant.remove();
        activeCroissants--;
        createCroissant();
    });
}

for (let i = 0; i < maxCroissants; i++) {
    createCroissant();
}

setInterval(() => {
    while (activeCroissants < maxCroissants) {
        createCroissant();
    }
}, 1000);
