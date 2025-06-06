const display = document.getElementById("display"); // The display element where the calculator input/output is shown is stored in the variable display

// The history section where the calculation history will be displayed is stored in the variable historyContainer
const historyContainer = document.getElementById("history");

// An empty array is initialized to store the last 6 calculations as history
let history = [];

// A boolean variable is declared to determine if the display should be cleared before the next input
// By default, it is set to false, meaning the display will not be cleared initially
let shouldClear = false;

// This function handles button clicks and display input on the calculator screen
function displayOnScreen(input) {
  const maxLength = 20; // Maximum length of the display input is set to 20 characters

  // If shouldClear is true, the display is cleared before adding new input
  if (shouldClear) {
    display.value = "";
    shouldClear = false;
  }

  // If the input is a number or an operator, it is added to the display
  if (display.value.length < maxLength) {
    display.value += input;
  }
}

// This function handles the backspace functionality to remove the last character from the display by slicing the string by one character
function backspace() {
  display.value = display.value.slice(0, -1);
}

// This function clears the display by setting its value to an empty string
function clearDisplay() {
  display.value = " ";
}

// This function evaluates the expression in the display and updates the display with the result
function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

// Here's an event listener for button clicks to handle input and operations from the keyboard
document.addEventListener("keydown", function (event) {
  const keyboard = event.key; // The key pressed on the keyboard is stored in the variable keyboard
  if (!isNaN(keyboard) || ".+-*/%^".includes(keyboard)) {
    displayOnScreen(keyboard);
  } else if (keyboard === "Enter" || keyboard === "=") {
    calculate(); // calculate() function is called when Enter or '=' is pressed
    event.preventDefault();
  } else if (keyboard === "Backspace") {
    backspace(); // backspace() function is called when Backspace is pressed
    event.preventDefault();
  } else if (keyboard.toLowerCase() === "c") {
    clearDisplay(); // clearDisplay() function is called when 'C' is pressed
    event.preventDefault();
  } else if (keyboard.toLowerCase() === "escape") {
    clearHistory(); // clearHistory() is called when Escape is pressed
    event.preventDefault();
  }
});

// This function handles button clicks and displays input on the display section of the calculator
function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    display.value = result;
    addToHistory(expression, result);
  } catch (error) {
    display.value = "Error";
  }
}

// This function adds the expression and result to the history array and updates the history display section
function addToHistory(expression, result) {
  history.unshift(`${expression} = ${result}`);
  if (history.length > 6) history.pop();
  renderHistory();
}

// This function renders the history of calculations in the history section of the calculator
function renderHistory() {
  historyContainer.innerHTML = history
    .map((item) => `<div class="history-item">${item}</div>`)
    .join("");
}

// This function clears the display and history, resetting the calculator to its initial state
function clearHistory() {
  display.value = " ";
  history = [];
  renderHistory();
}

// This function replaces the` ^` operator with `**` for exponentiation in the expression before evaluation
//It also initiates the shouldClear variable to true, indicating that the display should be cleared before the next input
// It also handles errors by displaying "Error" in the display if the evaluation fails
function calculate() {
  try {
    const expression = display.value.replace(/\^/g, "**");
    const result = eval(expression);
    display.value = result;
    addToHistory(expression, result);
    shouldClear = true;
  } catch (error) {
    display.value = "Error";
    shouldClear = true;
  }
}
