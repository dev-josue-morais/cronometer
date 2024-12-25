
function generateKeyframes() {
    const nColors = 80;
    const colors = [];

    // Gerar cores interpolando de rgb(255, 0, 0) para rgb(255, 165, 0)
    for (let i = 0; i < nColors; i++) {
        let r = 255;
        let g = Math.round(i * 165 / (nColors - 1));
        let b = 0;
        colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
    }

    // Gerar cores interpolando de rgb(255, 165, 0) para rgb(255, 255, 0)
    for (let i = 0; i < nColors; i++) {
        let r = 255;
        let g = 165 + Math.round(i * 90 / (nColors - 1));
        let b = 0;
        colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
    }

    // Gerar cores interpolando de rgb(255, 255, 0) para rgb(0, 255, 0)
    for (let i = 0; i < nColors; i++) {
        let r = 255 - Math.round(i * 255 / (nColors - 1));
        let g = 255;
        let b = 0;
        colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
    }

    // Gerar cores interpolando de rgb(0, 255, 0) para rgb(0, 0, 255)
    for (let i = 0; i < nColors; i++) {
        let r = 0;
        let g = 255 - Math.round(i * 255 / (nColors - 1));
        let b = Math.round(i * 255 / (nColors - 1));
        colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
    }

    // Gerar cores interpolando de rgb(0, 0, 255) para rgb(75, 0, 130)
    for (let i = 0; i < nColors; i++) {
        let r = Math.round(i * 75 / (nColors - 1));
        let g = 0;
        let b = 255 - Math.round(i * 125 / (nColors - 1));
        colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
    }

    // Gerar cores interpolando de rgb(75, 0, 130) para rgb(238, 130, 238)
    for (let i = 0; i < nColors; i++) {
        let r = 75 + Math.round(i * 163 / (nColors - 1));
        let g = Math.round(i * 130 / (nColors - 1));
        let b = 130 + Math.round(i * 108 / (nColors - 1));
        colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
    }

    // Gerar cores interpolando de rgb(238, 130, 238) para rgb(255, 0, 0)
    for (let i = 0; i < nColors; i++) {
        let r = 238 + Math.round(i * 17 / (nColors - 1));
        let g = 130 - Math.round(i * 130 / (nColors - 1));
        let b = 238 - Math.round(i * 238 / (nColors - 1));
        colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
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

    document.querySelector('.background').style.animation = 'pulseGradient 15s infinite linear';
    console.log(colors)} generateKeyframes();

