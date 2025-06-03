const display = document.getElementById("display");

function displayOnScreen(input) {
    display.value += input;

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