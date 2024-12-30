import { GameState } from './gameState.js';
import { generateQuestion, checkAnswer } from './gameLogic.js';
import { updateUI, showSection, hideSection } from './uiController.js';
import { startTimer, clearGameTimer } from './timer.js';

const gameState = new GameState();

window.onload = () => {
    document.getElementById('welcome').style.display = 'block';
    setTimeout(() => {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('startButton').style.display = 'block';
    }, 2000);
};

window.startGame = () => {
    showSection('operation');
    hideSection('startButton');
};

window.setOperation = (op) => {
    gameState.setOperation(op);
    showSection('difficulty');
    hideSection('operation');
};

window.setDifficulty = (level) => {
    gameState.setDifficulty(level);
    showSection('timeInput');
    hideSection('difficulty');
};

window.startQuestions = () => {
    const timeInput = document.getElementById('totalTime');
    if (timeInput.value < 10 || timeInput.value > 300) {
        alert('Please enter a time between 10 and 300 seconds');
        return;
    }

    gameState.startGame(parseInt(timeInput.value));
    updateUI(gameState);
    startTimer(gameState, endGame);
    generateQuestion(gameState);
};

window.checkAnswer = (selectedAnswer) => {
    if (!gameState.isActive) return;
    
    const result = checkAnswer(gameState, selectedAnswer);
    updateUI(gameState);
    
    if (gameState.attempts > 0 && gameState.timeLeft > 0) {
        setTimeout(() => generateQuestion(gameState), 1000);
    } else {
        endGame();
    }
};

function endGame() {
    gameState.endGame();
    clearGameTimer();
    updateUI(gameState);
}

window.restartGame = () => {
    hideSection('finalScore');
    showSection('operation');
    gameState.reset();
};

window.quitGame = () => {
    gameState.reset();
    clearGameTimer();
    updateUI(gameState);
    showSection('startButton');
};