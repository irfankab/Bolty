class Animations {
    static addButtonHoverEffect() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('option-hover');
                soundEffects.playSound('click');
            });
            button.addEventListener('mouseleave', () => {
                button.classList.remove('option-hover');
            });
        });
    }

    static showCorrectAnswer(element) {
        element.classList.add('correct-answer');
        setTimeout(() => {
            element.classList.remove('correct-answer');
        }, 1000);
    }

    static showWrongAnswer(element) {
        element.classList.add('wrong-answer');
        setTimeout(() => {
            element.classList.remove('wrong-answer');
        }, 1000);
    }

    static pulseElement(element) {
        element.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    Animations.addButtonHoverEffect();
});