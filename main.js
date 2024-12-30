document.addEventListener('DOMContentLoaded', () => {
    // Show welcome message with animation
    const welcome = document.getElementById('welcome');
    welcome.style.display = 'block';
    
    // Hide welcome message and show start button after 3 seconds
    setTimeout(() => {
        welcome.style.display = 'none';
        document.getElementById('startButton').style.display = 'block';
    }, 3000);
});