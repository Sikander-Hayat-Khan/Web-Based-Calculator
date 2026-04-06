const Grid = document.getElementById("grid");
const topDisplay = document.getElementById("top-display");
const bottomDisplay = document.getElementById("bottom-display");

let currentInput = "";
let previousInput = "";
let operator = "";
let memory = null; 

// text to be added to the buttons after their creation
const buttonArray = [
    ["MC", "0", "1", "2", "+"],
    ["MS", "3", "4", "5", "-"],
    ["MR", "6", "7", "8", "x"],
    ["M+", "9", "±", "=", "/"],
    ["1/x", ".", "x²", "√", "C"]
];

const accentOperators = ["MC", "MS", "MR", "M+", "C", "/", "+", "-", "x", "="];
const secondaryOperators = ["1/x", ".", "x²", "√", "±"];

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        const val = buttonArray[i][j];
        const button = document.createElement("button");
        button.textContent = val;
        Grid.appendChild(button);

        if (accentOperators.includes(val)) {
            button.classList.add("btn-accent");
        } else if (secondaryOperators.includes(val)) {
            button.classList.add("btn-secondary");
        } else {
            button.classList.add("btn-primary");
        }
        
        // Scale effect on click
        button.addEventListener("click", () => {
            button.classList.add("clicked");
            setTimeout(() => {
                button.classList.remove("clicked");
            }, 150);
        });

        // Assigning functions
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
        } else if (val === "M+") {
            button.addEventListener("click", memoryAdd);
        }
    }
}

function isDigit(str) {
    return /^\d$/.test(str);
}

function appendValue(value) {
    currentInput += value;
    updateBottom(currentInput);
}

function setOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = "";
    updateTop(`${previousInput} ${operator}`);
    updateBottom("");
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
    updateTop("");
    updateBottom(currentInput);
}

function clearScreen() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateTop("");
    updateBottom("0");
}

function toggleSign() {
    if (currentInput === "") return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateBottom(currentInput);
}

function sqrt() {
    if (currentInput === "") return;
    let num = parseFloat(currentInput);
    currentInput = num >= 0 ? Math.sqrt(num).toString() : "Error";
    updateBottom(currentInput);
}

function square() {
    if (currentInput === "") return;
    let num = parseFloat(currentInput);
    currentInput = (num * num).toString();
    updateBottom(currentInput);
}

function reciprocal() {
    if (currentInput === "") return;
    let num = parseFloat(currentInput);
    currentInput = num !== 0 ? (1 / num).toString() : "Error";
    updateBottom(currentInput);
}

function memoryStore() {
    if (currentInput === "" || currentInput === "Error") return;
    memory = parseFloat(currentInput);
    updateTop("Stored");
}

function memoryRecall() {
    if (memory === null) return;
    currentInput = memory.toString();
    updateTop("Read");
    updateBottom(currentInput);
}

function memoryClear() {
    memory = null;
    updateTop("");
}

function memoryAdd() {
    if (memory === null || currentInput === "") return;
    let num = parseFloat(currentInput);
    if (!isNaN(num)) {
        let newTotal = num + memory;
        currentInput = newTotal.toString();
        updateBottom(currentInput);
        updateTop("Added from Memory");
    }
}

function updateTop(value) {
    topDisplay.textContent = value;
}

function updateBottom(value) {
    bottomDisplay.textContent = value || "0";
}
