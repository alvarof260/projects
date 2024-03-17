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
const display = document.querySelector(".calculator_display");
const previousOperandTextElement = document.querySelector(".previous_operand");
const currentOperandTextElement = document.querySelector(".current_operand");
const buttons = document.querySelectorAll(".calculator_button");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  appendNumber(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerText.match(/[0-9]/)) {
      calculator.appendNumber(e.target.innerText);
    }
    if (e.target.innerText === "ac") {
      calculator.clear();
    }
    if (e.target.innerText === "del") {
      calculator.delete();
    }
  });
});
