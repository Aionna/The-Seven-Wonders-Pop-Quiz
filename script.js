const quizData = [
    {
        question: "Why did the AI give Ioanna a third hand for chomping down the ramen?",
        image: "japan (3).jpg",
        options: ["It was 'create one , get one hand for free' day !", "A finger here, a hand there, two hands mashed together... That's what AIs do.", "Have you seen her use chopsticks? Enough said!", "In order to strike that cute pose ,she needed a helping hand!"],
        correct: "Have you seen her use chopsticks? Enough said!",
        explanation: "Even three are not enough!",
    },
    {
        question: "Ioanna is a famous onna-musha, and like all legendary figures, her image tends to get a bit... exaggerated. Take this one for example! How so?",
        image: "japan (5).jpg",
        options: ["Those extra fingers really help her juggle swords like a pro!", "Her hair: long, dark, and miraculously immune to frizz!", "Her big fluffy...pillows!", "All of the above!"],
        correct: "All of the above!",
        explanation: "She fights enemies with a normal set of fingers, frizzy hair and... small cushions which make it even more impressive!",
    },
    {
        question: "What's depicted in the picture?",
        image: "japan (10).jpg",
        options: ["Are you blind?A fine japanese knife perfect for cutting you waygu steak!", "Suns & moons and various other stars. I can't see anything else, can you?", "A katana.The Green-eyed Samurai's katana!", " A tanto! (The tricky answer)"],
        correct: "A katana.The Green-eyed Samurai's katana!",
        explanation: "Amaterasu knows how to spot a true warrior's heart! Her gift? A katana and a tanto!The katana just took the spotlight!",
    },
    {
        question: "Why is our beloved Green-Eyed Samurai crying?",
        image: "japan (14).jpg",
        options: ["His favorite ramen place was all out of ramen!", "Someone kidnapped the small Tanuki! OMFG!", "These are tears of joy because his favorite ramen shop was open and was stocked in ramen!", " His all out of hair shaping cream!"],
        correct: "Someone kidnapped the small Tanuki! OMFG!",
        explanation: "Though running out of hair formation cream would be the worst , in this case he shed a tear when the small Tanuki was abducted! Or maybe it was a tear because he had to go fetch her or something got into his eye...",
    },
    {
        question: "What is the Green-Eyed Samurai carrying?",
        image: "japan (1).jpg",
        options: ["His favorite ramen place was all out of ramen!", "Someone kidnapped the small Tanuki! OMFG!", "These are tears of joy because his favorite ramen shop was open and was stocked in ramen!", " His all out of hair shaping cream!"],
        correct: "Someone kidnapped the small Tanuki! OMFG!",
        explanation: "Though running out of hair formation cream would be the worst , in this case he shed a tear when the small Tanuki was abducted! Or maybe it was a tear because he had to go fetch her or just plain sweat that got into his eyes...",
    },
    
];

let currentQuestionIndex = 0;
let score = 0;
let randomizedQuestions = [];
const questionsPerQuiz = 4; 

const questionImageElement = document.getElementById("question-image");
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
    randomizedQuestions = randomizedQuestions.slice(0, questionsPerQuiz);
    
    showQuestion();
}

function showQuestion() {
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    questionImageElement.innerHTML = `<img src="${currentQuestion.image}" alt="Quiz question image">`;
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    explanationElement.textContent = '';
    explanationElement.classList.remove('loading');
    explanationElement.classList.add('hidden');

    nextButton.style.display = 'none';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-button';
        button.onclick = () => selectAnswer(option);
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
            explanationElement.textContent = `Incorrect. The correct answer is: ${currentQuestion.correct}. ${currentQuestion.explanation}`;
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
    if (score <= 1) {
        scoreDescription = "Oh mon dieu! 😱 You might want to brush up on your Seven Wonders knowledge!";
    } else if (score <= 2) {
        scoreDescription = "Eh ben, this isn't shabby at all! 😎 You're on your way to becoming a Seven Wonders expert!";
    } else if (score === 3) {
        scoreDescription = "Très bien! You're almost a Seven Wonders connoisseur! 🏆";
    } else {
        scoreDescription = "Oh là là! You're a true Seven Wonders connoisseur! 🏆 Magnifique!";
    }

    resultElement.innerHTML = `You scored ${score} out of ${randomizedQuestions.length}.<br><br>${scoreDescription}`;
    restartButton.style.display = 'block';
    nextButton.style.display = 'none';
    quizContainer.style.display = 'none';
    resultElement.style.display = 'block';
}

function restartQuiz() {
    quizContainer.style.display = 'none';
    resultElement.style.display = 'none';
    startScreen.style.display = 'block';
    restartButton.style.display = 'none';
    startButton.style.display = 'block';
}

// Initialize the quiz
function initQuiz() {
    startScreen.style.display = 'block';
    quizContainer.style.display = 'none';
    resultElement.style.display = 'none';
    restartButton.style.display = 'none';
    startButton.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', showNextQuestion);
    restartButton.addEventListener('click', restartQuiz);
    initQuiz();
});

// Croissant animation logic
const maxCroissant = 4;
let activeCroissant = 0;

function createCroissant() {
    if (activeCroissant >= maxCroissant) return;

    activeCroissant++;
    const croissantContainer = document.getElementById('croissant-container');
    const croissant = document.createElement('span');
    croissant.classList.add('croissant');
    croissant.textContent = '🥐';

    croissant.style.left = `${Math.random() * 100}vw`;
    const duration = Math.random() * 10 + 15; // 15 to 25 seconds
    croissant.style.animationDuration = `${duration}s`;
    
    croissantContainer.appendChild(croissant);

    croissant.addEventListener('animationend', () => {
        croissant.remove();
        activeCroissant--;
        createCroissant();
    });
}

// Start croissant animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loveLink = document.getElementById('love-link');
    const protonDriveLink = 'https://drive.proton.me/urls/DNFQ1CGQY4#otyr4Cf4LZzX';

    loveLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(protonDriveLink, '_blank');
    });

    // Initialize croissants
    for (let i = 0; i < maxCroissant; i++) {
        createCroissant();
    }
});