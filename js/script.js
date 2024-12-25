const modeTitle = document.getElementById('mode-title');
const numberDisplay = document.getElementById('number-display');
const toggleModeButton = document.getElementById('toggle-mode');
const initialTimeInput = document.getElementById('initial-time');
const errorMessage = document.getElementById('error-message');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

let isTimerMode = false;

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

function getNumericValue() {
    let value = initialTimeInput.value.replace(',', '.');
    let number = parseFloat(value);

    if (isNaN(number)) {
        return 0;
    }

    return number;
}

initialTimeInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        formatInput();
    }, 500);
});







startButton.addEventListener('click', () => {
    if (isTimerMode) {
        let numericValue = getNumericValue();
        console.log("true", numericValue);
    } else {
        let numericValue = getNumericValue();
        console.log("false", numericValue);
    }
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
