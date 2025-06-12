// Game elements
const dot = document.getElementById('dot');
const scoreElement = document.getElementById('score');
const gameArea = document.querySelector('.game-area');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

// Game variables
let score = 0;
let gameSpeed = 1500; // Initial time between dot movements in ms
let minSpeed = 700;   // Minimum time between dot movements
let gameActive = false;
let gameTimer = null;

// Initialize the game
function initGame() {
    // Add both click and touch events for better mobile support
    dot.addEventListener('click', dotClicked);
    dot.addEventListener('touchstart', handleTouch, { passive: false });
    
    // Add button event listeners
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    
    // Hide dot initially
    dot.style.display = 'none';
    
    // Initial positioning of dot (but don't show yet)
    positionDot();
}

// Handle touch events
function handleTouch(e) {
    // Prevent default behavior (scrolling, zooming)
    e.preventDefault();
    // Call the same function as for clicks
    dotClicked();
}

// Start the game
function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    score = 0;
    scoreElement.textContent = score;
    gameSpeed = 1500;
    
    // Show the dot
    dot.style.display = 'block';
    
    // Start the movement timer
    if (gameTimer) clearInterval(gameTimer);
    gameTimer = setInterval(missedDot, gameSpeed);
    
    // Change button text
    startBtn.textContent = 'Game Running';
    startBtn.disabled = true;
}

// Reset the game
function resetGame() {
    gameActive = false;
    score = 0;
    scoreElement.textContent = score;
    gameSpeed = 1500;
    
    // Clear timer
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    
    // Hide dot
    dot.style.display = 'none';
    
    // Reset button
    startBtn.textContent = 'Start Game';
    startBtn.disabled = false;
}

// Position the dot randomly
function positionDot() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const dotSize = dot.offsetWidth;
    
    // Make sure we account for the dot's size
    const maxX = gameAreaRect.width - dotSize;
    const maxY = gameAreaRect.height - dotSize;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    dot.style.left = randomX + 'px';
    dot.style.top = randomY + 'px';
}

// Handle dot click/tap
function dotClicked() {
    if (!gameActive) return;
    
    // Increase score
    score++;
    scoreElement.textContent = score;
    
    // Scale animation
    dot.style.transform = 'scale(1.2)';
    setTimeout(() => {
        dot.style.transform = 'scale(1)';
    }, 100);
    
    // Increase game speed
    if (gameSpeed > minSpeed) {
        gameSpeed -= 50;
        
        // Update interval timer with new speed
        clearInterval(gameTimer);
        gameTimer = setInterval(missedDot, gameSpeed);
    }
    
    // Move dot to a new position
    positionDot();
}

// Handle missed dot
function missedDot() {
    if (!gameActive) return;
    positionDot();
}

// Start the game when page loads
window.addEventListener('load', initGame);

// Prevent default touch events on game area to avoid scrolling
gameArea.addEventListener('touchstart', function(e) {
    e.preventDefault();
}, { passive: false });

// Handle device orientation changes
window.addEventListener('resize', function() {
    if (gameActive) {
        positionDot();
    }
}); 