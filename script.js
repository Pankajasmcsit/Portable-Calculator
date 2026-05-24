// ===== GET THE DISPLAY ELEMENT =====
const display = document.getElementById("result");

// ===== STORE CALCULATOR STATE =====
let currentNumber = "";
let previousNumber = "";
let operator = "";

// ===== WHEN A NUMBER BUTTON IS CLICKED =====
function pressNumber(num) {
  if (currentNumber.length >= 10) return;
  currentNumber += num;

  if (operator !== "") {
    // show full expression like: 55 + 2
    display.textContent = previousNumber + " " + operator + " " + currentNumber;
  } else {
    display.textContent = currentNumber;
  }
}

// ===== WHEN AN OPERATOR IS CLICKED ( + - × ÷ ) =====
function pressOperator(op) {
  if (currentNumber === "") return;
  previousNumber = currentNumber;
  currentNumber = "";
  operator = op;
  display.textContent = previousNumber + " " + operator;
}

// ===== WHEN EQUALS IS CLICKED =====
function pressEquals() {
  if (currentNumber === "" || previousNumber === "") return;

  let num1 = parseFloat(previousNumber);
  let num2 = parseFloat(currentNumber);
  let answer = 0;

  if (operator === "+")  answer = num1 + num2;
  if (operator === "−")  answer = num1 - num2;
  if (operator === "×")  answer = num1 * num2;
  if (operator === "÷")  answer = num2 !== 0 ? num1 / num2 : "Error";

  display.textContent = answer;
  currentNumber = String(answer);
  previousNumber = "";
  operator = "";
}

// ===== WHEN C (CLEAR) IS CLICKED =====
function pressClear() {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  display.textContent = "0";
}

// ===== WHEN % IS CLICKED =====
function pressPercent() {
  if (currentNumber === "") return;
  currentNumber = String(parseFloat(currentNumber) / 100);
  display.textContent = currentNumber;
}

// ===== WHEN ± IS CLICKED =====
function pressSign() {
  if (currentNumber === "") return;
  currentNumber = String(parseFloat(currentNumber) * -1);
  display.textContent = currentNumber;
}

// ===== ATTACH FUNCTIONS TO ALL BUTTONS =====
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => {
    const text = button.textContent;

    if (button.classList.contains("number")) pressNumber(text);
    if (button.classList.contains("operator")) pressOperator(text);
    if (button.classList.contains("equals"))   pressEquals();
    if (button.classList.contains("clear"))    pressClear();
    if (text === "%")  pressPercent();
    if (text === "±")  pressSign();
  });
});
