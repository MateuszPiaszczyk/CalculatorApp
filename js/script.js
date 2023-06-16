const currentNumber = document.querySelector(".currentNumber");
const previousNumber = document.querySelector(".previousNumber");
const mathSign = document.querySelector(".mathSign");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const calculatorHistory = document.querySelector(".history");
const historyButton = document.querySelector(".history-button");

let result = "";

function displayNumbers() {
  if (this.textContent === "." && currentNumber.innerHTML.includes(".")) return;
  if (this.textContent === "." && currentNumber.innerHTML === "") return
  currentNumber.innerHTML = "";

  currentNumber.innerHTML += this.textContent;
}

function operate() {
  if (currentNumber.innerHTML === `` && this.textContent === `-`) {
    currentNumber.innerHTML = ``;
    return;

  } 
  else if (currentNumber.innerHTML === ``) {
    return;
  }

  if (mathSign.innerHTML !== 0) {
    showResult();
  }
  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = "";
}

function showResult() {
  if (previousNumber.innerHTML === "" || currentNumber.innerHTML === "") return;

  let a = Number(currentNumber.innerHTML);
  let b = Number(previousNumber.innerHTML);
  let operator = mathSign.innerHTML;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = b - a;
      break;
    case "x":
      result = a * b;
      break;
    case ":":
      result = b / a;
      break;
    case "2^":
      result = b ** a;
      break;
  }

  addToHistory();
  historyButton.classList.add("history-button--active");
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

function addToHistory() {
  const newHistoryItem = document.createElement("li");
  newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
  newHistoryItem.classList.add("history-item");
  calculatorHistory.appendChild(newHistoryItem);
}
function clearHistory() {
  calculatorHistory.textContent = "";
  if (calculatorHistory.textContent === "") {
    historyButton.classList.remove("history-button--active");
  }
}
function clearScreen() {
  result = "";
  currentNumber.innerHTML = "";
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

operatorButtons.forEach((button) => button.addEventListener("click", operate));
equalButton.addEventListener("click", showResult);
clearButton.addEventListener("click", clearScreen);
numberButtons.forEach((button) => {
  button.addEventListener("click", displayNumbers);
});

historyButton.addEventListener("click", clearHistory);
