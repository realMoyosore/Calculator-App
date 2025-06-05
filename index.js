const display = document.getElementById("display");

function displayOnScreen(input) {
    display.value += input;

}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = " ";
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    }
    catch (error) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function (event) {
    const keyboard = event.key;
    if (!isNaN(keyboard) || ".+-*/%^".includes(keyboard)) {
        displayOnScreen(keyboard);
    } else if (keyboard === "Enter" || keyboard === "=") {
        calculateResult();
        event.preventDefault();
    } else if (keyboard === "Backspace") {
        backspace();
        event.preventDefault();
    } else if (keyboard.toLowerCase() === "c") {
        clearDisplay();
        event.preventDefault();
    }
});

function displayOnScreen(input) {
    const maxLength = 20;
    if (display.value.length < maxLength) {
        display.value += input;
    }
}

const historyContainer = document.getElementById("history");
let history = [];

function calculateResult() {
    try {
        const expression = display.value;
        const result = eval(expression);
        display.value = result;
        addToHistory(expression, result);
    }
    catch (error) {
        display.value = "Error";
    }
}

function addToHistory(expression, result) {
    history.unshift(`${expression} = ${result}`);
    if (history.length > 5) history.pop();
    renderHistory();
}

function renderHistory() {
    historyContainer.innerHTML = history
        .map(item => `<div class="history-item">${item}</div>`)
        .join('');
}