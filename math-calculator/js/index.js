const links = document.querySelectorAll(".navbar_link");
const bg = document.querySelector(".bg-link");

links[0].classList.add("active");

for (let link of links) {
  link.addEventListener("click", function () {
    // Quitar la clase 'active' de todos los enlaces
    for (let otherLink of links) {
      otherLink.classList.remove("active");
    }

    // Agregar la clase 'active' al enlace que se ha hecho clic
    link.classList.add("active");

    bg.style.left = `${link.offsetLeft}px`;
    bg.style.width = `${link.offsetWidth}px`;
  });
}

/* calculator logic */
const previousOperandTextElement = document.querySelector(".previous_operand");
const currentOperandTextElement = document.querySelector(".current_operand");
const buttons = document.querySelectorAll(".calculator_button");
const operators = document.querySelectorAll("[aria-operator]");
const numbers = document.querySelectorAll("[aria-number]");
const restartButton = document.querySelector("[aria-restart]");
const deleteButton = document.querySelector("[aria-delete]");
const equalButton = document.querySelector("[aria-equal]");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  append(number) {
    if (this.currentOperand.length < 1 && number == ".") {
      this.currentOperand = "0";
      this.updateDisplay();
    }
    if (this.currentOperand.length < 1 && number == "0") return;
    if (this.currentOperand.includes(".") && number == ".") return;
    if (this.currentOperand.length > 0 && number == "-") return;
    this.currentOperand += number.toString();
    this.updateDisplay();
  }

  operation(operator) {
    if (!this.currentOperand && operator === "-") {
      this.currentOperand = operator;
      this.updateDisplay();
      return;
    }
    if (!this.currentOperand) return;
    if (
      this.currentOperand === "0" ||
      this.currentOperand === "0." ||
      this.currentOperand === "-"
    )
      return;
    if (this.previousOperand) return;
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  compute() {
    if (this.previousOperand && !this.currentOperand) return;
    if (!this.previousOperand) return;
    switch (this.operator) {
      case "÷":
        this.currentOperand =
          parseFloat(this.previousOperand) / parseFloat(this.currentOperand);
        break;
      case "×":
        this.currentOperand =
          parseFloat(this.previousOperand) * parseFloat(this.currentOperand);
        break;
      case "-":
        this.currentOperand =
          parseFloat(this.previousOperand) - parseFloat(this.currentOperand);
        break;
      case "+":
        this.currentOperand =
          parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
        break;
    }
    this.previousOperand = "";
    this.currentOperand = this.currentOperand.toString();
    this.operator = undefined;
    this.updateDisplay();
  }

  delete() {
    if (this.currentOperand === "0.") {
      this.clear();
    }
    this.currentOperand = this.currentOperand.slice(
      0,
      this.currentOperand.length - 1
    );
    this.updateDisplay();
  }

  clear() {
    if (!this.previousOperandTextElement && !this.currentOperandTextElement)
      return;
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
    this.updateDisplay();
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = this.previousOperand;
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

restartButton.addEventListener("click", () => {
  calculator.clear();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

numbers.forEach((button) => {
  button.addEventListener("click", (e) => {
    const number = e.target.innerText;
    calculator.append(number);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", (e) => {
    const operator = e.target.innerText;
    calculator.operation(operator);
  });
});


document.addEventListener("keydown", (e) => {
  if(e.key >= 0 && e.key <= 9) {
    calculator.append(e.key);
  }
  if(e.key === ".") {
    calculator.append(e.key);
  }
  if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    calculator.operation(e.key);
  }
  if(e.key === "Backspace") {
    calculator.delete();
  }
  if(e.key === "Enter") {
    calculator.compute();
  }
  if(e.key === "Escape" || e.key === "Delete") {
    calculator.clear();
  }
})

