class MathGame {
    constructor() {
        this.score = 0;
        this.attempts = 3;
        this.timeLeft = 60;
        this.timer = null;
        this.operation = null;
        this.difficulty = null;
        this.correctAnswer = null;
        this.totalTime = 60;
    }

    startGame() {
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('operation').style.display = 'block';
        soundEffects.playSound('click');
    }

    setOperation(op) {
        this.operation = op;
        document.getElementById('operation').style.display = 'none';
        document.getElementById('difficulty').style.display = 'block';
        soundEffects.playSound('click');
        Animations.pulseElement(document.getElementById('difficulty'));
    }

    setDifficulty(level) {
        this.difficulty = level;
        document.getElementById('difficulty').style.display = 'none';
        document.getElementById('timeInput').style.display = 'block';
        soundEffects.playSound('click');
        Animations.pulseElement(document.getElementById('timeInput'));
    }

    startQuestions() {
        this.totalTime = parseInt(document.getElementById('totalTime').value);
        this.timeLeft = this.totalTime;
        document.getElementById('timeInput').style.display = 'none';
        document.getElementById('score').style.display = 'block';
        document.getElementById('timer').style.display = 'block';
        document.getElementById('quitButton').style.display = 'block';
        this.attempts = 3;
        this.score = 0;
        this.updateScoreboard();
        this.startTimer();
        this.nextQuestion();
        soundEffects.playSound('click');
    }

    generateQuestion() {
        const num1 = this.getRandomInt();
        const num2 = this.getRandomInt();
        this.correctAnswer = this.calculateAnswer(num1, num2);
        
        document.getElementById('question').innerText = `What is ${num1} ${this.operation} ${num2}?`;
        this.generateOptions();
        document.getElementById('question').style.display = 'block';
        document.getElementById('options').style.display = 'block';
    }

    getRandomInt() {
        const ranges = {
            'easy': 10,
            'medium': 50,
            'hard': 100
        };
        return Math.floor(Math.random() * ranges[this.difficulty]) + 1;
    }

    calculateAnswer(num1, num2) {
        switch (this.operation) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '×': return num1 * num2;
            case '÷': return Number((num1 / num2).toFixed(2));
        }
    }

    generateOptions() {
        const options = new Set();
        options.add(this.correctAnswer);
        
        while (options.size < 4) {
            const wrongAnswer = this.generateConfusingOption();
            if (wrongAnswer !== this.correctAnswer) {
                options.add(wrongAnswer);
            }
        }

        const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        
        optionsArray.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => this.checkAnswer(option, button);
            optionsContainer.appendChild(button);
        });
    }

    generateConfusingOption() {
        const range = Math.max(5, Math.abs(this.correctAnswer * 0.2));
        return Number((this.correctAnswer + (Math.random() - 0.5) * range).toFixed(2));
    }

    checkAnswer(selectedAnswer, button) {
        if (selectedAnswer === this.correctAnswer) {
            this.score++;
            soundEffects.playSound('correct');
            Animations.showCorrectAnswer(button);
        } else {
            this.attempts--;
            soundEffects.playSound('wrong');
            Animations.showWrongAnswer(button);
        }
        
        this.updateScoreboard();
        
        if (this.attempts > 0 && this.timeLeft > 0) {
            setTimeout(() => this.nextQuestion(), 1000);
        } else {
            this.endGame();
        }
    }

    startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.endGame();
            } else {
                this.timeLeft--;
                document.getElementById('timeLeftDisplay').innerText = this.timeLeft;
                if (this.timeLeft <= 10) {
                    Animations.pulseElement(document.getElementById('timer'));
                }
            }
        }, 1000);
    }

    updateScoreboard() {
        document.getElementById('score').innerText = `Score: ${this.score} | Attempts left: ${this.attempts}`;
    }

    nextQuestion() {
        this.generateQuestion();
    }

    endGame() {
        clearInterval(this.timer);
        document.getElementById('options').style.display = 'none';
        document.getElementById('question').style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        this.displayFinalScore();
    }

    displayFinalScore() {
        const finalScoreDiv = document.getElementById('finalScore');
        finalScoreDiv.innerText = `Game Over! Your final score is: ${this.score}`;
        finalScoreDiv.style.display = 'block';
        
        const restartButton = document.createElement('button');
        restartButton.innerText = 'Play Again';
        restartButton.onclick = () => this.restartGame();
        finalScoreDiv.appendChild(restartButton);
    }

    restartGame() {
        this.score = 0;
        this.attempts = 3;
        this.timeLeft = this.totalTime;
        document.getElementById('finalScore').style.display = 'none';
        this.updateScoreboard();
        this.startTimer();
        this.nextQuestion();
    }

    quitGame() {
        clearInterval(this.timer);
        this.score = 0;
        this.attempts = 3;
        this.operation = null;
        this.difficulty = null;
        this.totalTime = null;

        document.getElementById('score').style.display = 'none';
        document.getElementById('finalScore').style.display = 'none';
        document.getElementById('question').style.display = 'none';
        document.getElementById('options').style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('timeLeftDisplay').innerText = '';
        document.getElementById('startButton').style.display = 'block';
        document.getElementById('quitButton').style.display = 'none';
    }
}

const game = new MathGame();