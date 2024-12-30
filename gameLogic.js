export function generateQuestion(gameState) {
    if (!gameState.isActive) return;
    
    const num1 = getRandomInt(gameState.difficulty);
    let num2 = getRandomInt(gameState.difficulty);
    
    if (gameState.operation === '÷') {
        num2 = num2 || 1;
        const temp = num1 * num2;
        gameState.currentQuestion = {
            num1: temp,
            num2: num2,
            answer: num1
        };
    } else {
        gameState.currentQuestion = {
            num1: num1,
            num2: num2,
            answer: calculateAnswer(num1, num2, gameState.operation)
        };
    }
    
    generateOptions(gameState);
}

function getRandomInt(level) {
    const ranges = {
        'easy': 10,
        'medium': 50,
        'hard': 100
    };
    return Math.floor(Math.random() * ranges[level]) + 1;
}

function calculateAnswer(num1, num2, operation) {
    switch (operation) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '×': return num1 * num2;
        case '÷': return Math.round(num1 / num2);
    }
}

function generateOptions(gameState) {
    const options = new Set();
    options.add(gameState.currentQuestion.answer);
    
    while (options.size < 4) {
        let wrongAnswer;
        if (gameState.operation === '÷') {
            wrongAnswer = gameState.currentQuestion.answer + 
                Math.floor(Math.random() * 5) * (Math.random() < 0.5 ? -1 : 1);
        } else {
            wrongAnswer = gameState.currentQuestion.answer + 
                Math.floor(Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1);
        }
        if (wrongAnswer > 0) options.add(wrongAnswer);
    }

    gameState.currentQuestion.options = Array.from(options).sort((a, b) => a - b);
}

export function checkAnswer(gameState, selectedAnswer) {
    if (selectedAnswer == gameState.currentQuestion.answer) {
        gameState.score++;
        return true;
    } else {
        gameState.attempts--;
        return false;
    }
}