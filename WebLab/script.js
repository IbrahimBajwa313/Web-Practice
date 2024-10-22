const texts = ["Web Developer", "AiML Engr", "Full Stack Devr"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('dynamic-text').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1000);  // Pause before starting next word
    } else {
        setTimeout(type, 100);
    }
})();
