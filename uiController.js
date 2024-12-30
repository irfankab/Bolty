export function updateUI(gameState) {
    const sections = ['score', 'gameArea', 'operation', 'difficulty', 'timeInput', 'quitButton'];
    sections.forEach(id => document.getElementById(id).style.display = 'none');

    if (gameState.isActive) {
        showSection('score');
        showSection('gameArea');
        showSection('quitButton');
        updateGameArea(gameState);
    } else if (!gameState.operation) {
        showSection('startButton');
    } else {
        showFinalScore(gameState);
    }
}

export function showSection(id) {
    const element = document.getElementById(id);
    if (element) element.style.display = 'block';
}

export function hideSection(id) {
    const element = document.getElementById(id);
    if (element) element.style.display = 'none';
}

function updateGameArea(gameState) {
    if (gameState.currentQuestion) {
        document.getElementById('question').innerHTML = 
            `<strong>${gameState.currentQuestion.num1} ${gameState.operation} ${gameState.currentQuestion.num2}</strong>`;
        
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        gameState.currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => window.checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    }

    document.getElementById('score').innerText = 
        `Score: ${gameState.score} | Attempts left: ${gameState.attempts}`;
}

function showFinalScore(gameState) {
    const finalScoreDiv = document.getElementById('finalScore');
    finalScoreDiv.innerHTML = `
        <h2>Game Over!</h2>
        <p>Final Score: ${gameState.score}</p>
        <button onclick="restartGame()">Play Again</button>
    `;
    showSection('finalScore');
}