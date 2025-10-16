const Grid = document.getElementById("grid");
const screen = document.getElementById("display");

let button;
let currentInput = "";
let previousInput = "";
let operator = "";
let memory = null; // 💾 Memory variable

const buttonArray = [
    ["MC", "0", "1", "2", "+"],
    ["MS", "3", "4", "5", "-"],
    ["MR", "6", "7", "8", "x"],
    ["M+", "9", "±", "=", "/"],
    ["1/x", ".", "x²", "√", "C"]
];

// --- Create buttons dynamically ---
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        const val = buttonArray[i][j];
        button = document.createElement("button");
        button.textContent = val;
        Grid.appendChild(button);

        // --- Assign functionality ---
        if (isDigit(val) || val === ".") {
            button.addEventListener("click", () => appendValue(val));
        } else if (["+", "-", "x", "/"].includes(val)) {
            button.addEventListener("click", () => setOperator(val));
        } else if (val === "=") {
            button.addEventListener("click", calculate);
        } else if (val === "C") {
            button.addEventListener("click", clearScreen);
        } else if (val === "±") {
            button.addEventListener("click", toggleSign);
        } else if (val === "√") {
            button.addEventListener("click", sqrt);
        } else if (val === "x²") {
            button.addEventListener("click", square);
        } else if (val === "1/x") {
            button.addEventListener("click", reciprocal);
        } else if (val === "MS") {
            button.addEventListener("click", memoryStore);
        } else if (val === "MR") {
            button.addEventListener("click", memoryRecall);
        } else if (val === "MC") {
            button.addEventListener("click", memoryClear);
        }
    }
}

// --- Core Functions ---

function isDigit(str) {
    return /^\d$/.test(str);
}

function appendValue(value) {
    currentInput += value;
    updateScreen(currentInput);
}

function setOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function calculate() {
    if (previousInput === "" || currentInput === "") return;

    let a = parseFloat(previousInput);
    let b = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "x": result = a * b; break;
        case "/": result = b !== 0 ? a / b : "Error"; break;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateScreen(currentInput);
}

function clearScreen() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateScreen("");
}

function toggleSign() {
    if (currentInput === "") return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateScreen(currentInput);
}

function sqrt() {
    if (currentInput === "") return;
    let num = parseFloat(currentInput);
    currentInput = num >= 0 ? Math.sqrt(num).toString() : "Error";
    updateScreen(currentInput);
}

function square() {
    if (currentInput === "") return;
    let num = parseFloat(currentInput);
    currentInput = (num * num).toString();
    updateScreen(currentInput);
}

function reciprocal() {
    if (currentInput === "") return;
    let num = parseFloat(currentInput);
    currentInput = num !== 0 ? (1 / num).toString() : "Error";
    updateScreen(currentInput);
}

// --- Memory Functions ---

function memoryStore() {
    if (currentInput === "" || currentInput === "Error") return;
    memory = parseFloat(currentInput);
    updateScreen("Stored: " + memory);
}

function memoryRecall() {
    if (memory === null) return;
    currentInput = memory.toString();
    updateScreen(currentInput);
}

function memoryClear() {
    memory = null;
    updateScreen("Memory Cleared");
}

function updateScreen(value) {
    screen.textContent = value;
}
