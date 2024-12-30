let timer;

export function startTimer(gameState, endGameCallback) {
    clearInterval(timer);
    timer = setInterval(() => {
        if (gameState.timeLeft <= 0) {
            clearInterval(timer);
            endGameCallback();
        } else {
            gameState.timeLeft--;
            document.getElementById('timeLeftDisplay').innerText = gameState.timeLeft;
        }
    }, 1000);
}

export function clearGameTimer() {
    clearInterval(timer);
}