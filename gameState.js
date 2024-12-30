export class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        this.score = 0;
        this.attempts = 3;
        this.operation = null;
        this.difficulty = null;
        this.totalTime = null;
        this.timeLeft = null;
        this.isActive = false;
        this.currentQuestion = null;
    }

    setOperation(op) {
        this.operation = op;
    }

    setDifficulty(level) {
        this.difficulty = level;
    }

    startGame(time) {
        this.totalTime = time;
        this.timeLeft = time;
        this.attempts = 3;
        this.score = 0;
        this.isActive = true;
    }

    endGame() {
        this.isActive = false;
    }
}