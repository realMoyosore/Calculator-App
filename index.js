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

