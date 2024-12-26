const modeTitle = document.getElementById('mode-title');
const numberDisplay = document.getElementById('number-display');
const toggleModeButton = document.getElementById('toggle-mode');
const initialTimeInput = document.getElementById('initial-time');
const errorMessage = document.getElementById('error-message');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

let isTimerMode = false; // cronometro = false | temporizador = true

modeTitle.textContent = isTimerMode ? 'Temporizador' : 'Cronômetro';
toggleModeButton.textContent = isTimerMode ? 'Alternar para Cronômetro' : 'Alternar para Temporizador';
initialTimeInput.style.display = isTimerMode ? 'block' : 'none';
errorMessage.style.display = 'none';
initialTimeInput.value = '';

toggleModeButton.addEventListener('click', () => {
    isTimerMode = !isTimerMode;
    modeTitle.textContent = isTimerMode ? 'Temporizador' : 'Cronômetro';
    toggleModeButton.textContent = isTimerMode ? 'Alternar para Cronômetro' : 'Alternar para Temporizador';
    initialTimeInput.style.display = isTimerMode ? 'block' : 'none';
    errorMessage.style.display = 'none';
    initialTimeInput.value = '';
});

let debounceTimeout;
function formatInput() {
    let value = initialTimeInput.value;

    value = value.replace(/\D/g, '');

    let number = parseInt(value, 10) || 0;

    let minutes = Math.floor(number / 100);
    let seconds = number % 100;

    let formattedValue = `${minutes},${seconds.toString().padStart(2, '0')}`;

    initialTimeInput.value = formattedValue;

    if (seconds >= 60) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Segundos > 59 inválidos';
        startButton.disabled = true;
        stopButton.disabled = true;
        resetButton.disabled = true;
    } else {
        errorMessage.style.display = 'none';
        startButton.disabled = false;
        stopButton.disabled = false;
        resetButton.disabled = false;
    }
}

initialTimeInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        formatInput();
    }, 500);
});

let timer;
let stoper;
let numericValue = 0;
let number = 0;
let isRunning = false;

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}



function updateTimerDisplay(value) {
    let formattedTime = formatTime(value);
    document.querySelector(".timer").innerHTML = formattedTime;
}

startButton.addEventListener('click', () => {
    if (isRunning) return;

    isRunning = true;
    
    if (!isTimerMode) { // Cronômetro
        timer = setInterval(() => {
            number++;
            updateTimerDisplay(number);
        }, 1000);
    } else { // Temporizador
        numericValue = getNumericValue();
        stoper = setInterval(() => {
            if (numericValue <= 0) {
                stopTimer();
                reset();
            } else {
                numericValue--;
                updateTimerDisplay(numericValue);
            }
        }, 1000);
    }
});

function stopTimer() {
    clearInterval(stoper);
    stoper = null;
    isRunning = false;
    number = 0;
    numericValue = 0;
    updateTimerDisplay(0);
    // const sound = new Audio('alarm.mp3');
    // sound.play();
    alert("time's up playng song...");
}

function getNumericValue() {
    let value = initialTimeInput.value.replace(',', '.');
    let number = parseFloat(value);

    let minutes = Math.floor(number); 
    let seconds = Math.round((number - minutes) * 100);

    if (seconds >= 60) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Segundos > 59 inválidos';
        startButton.disabled = true;
        stopButton.disabled = true;
        resetButton.disabled = true;
        return 0;
    } else {
        errorMessage.style.display = 'none';
        startButton.disabled = false;
        stopButton.disabled = false;
        resetButton.disabled = false;
    }

    return minutes * 60 + seconds;
}

stopButton.addEventListener('click', () => {
    clearInterval(timer);
    clearInterval(stoper);
    isRunning = false;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    clearInterval(stoper);
    isRunning = false;
    number = 0;
    numericValue = 0;
    updateTimerDisplay(0);
});

function generateKeyframes() {
    const nColors = 150;
    const colors = [];

    for (let i = 0; i < nColors; i++) {
        let r = 255 - Math.round(i * 91 / (nColors - 1));
        let g = 255 - Math.round(i * 50 / (nColors - 1));
        let b = 255 - Math.round(i * 80 / (nColors - 1));
        colors.push(`rgba(${r}, ${g}, ${b}, 0.9)`);
    }

    for (let i = 0; i < nColors; i++) {
        let r = 164 + Math.round(i * 91 / (nColors - 1));
        let g = 205 + Math.round(i * 50 / (nColors - 1));
        let b = 175 + Math.round(i * 80 / (nColors - 1));
        colors.push(`rgba(${r}, ${g}, ${b}, 0.9)`);
    }

    let keyframes = "@keyframes pulseGradient {\n";
    const totalSteps = colors.length;
    const percentageStep = (100 / totalSteps).toFixed(2);

    for (let i = 0; i < totalSteps; i++) {
        const percentage = (i * percentageStep).toFixed(2) + "%";
        keyframes += `    ${percentage} {\n        background: radial-gradient(circle, ${colors.join(", ")});\n    }\n`;

        const lastColor = colors.pop();
        colors.unshift(lastColor);
    }

    keyframes += `    100% {\n        background: radial-gradient(circle, ${colors.join(", ")});\n    }\n}`;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    document.querySelector('.background').style.animation = 'pulseGradient 5s infinite linear';
} generateKeyframes();
