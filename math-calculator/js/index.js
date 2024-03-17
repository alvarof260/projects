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
const operators = document.querySelectorAll("[aria-operator]");
const numbers = document.querySelectorAll("[aria-number]");
const restartButton = document.querySelector("[aria-restart]");
const deleteButton = document.querySelector("[aria-delete]");
const equalButton = document.querySelector("[aria-equal]");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear()
  }

  append(number) {
    if(this.currentOperand.length < 1 && number == "."){
      this.currentOperand = '0'
      this.updateDisplay()
    }
    if(this.currentOperand.includes('.') && number == ".") return
    this.currentOperand += number.toString();
    this.updateDisplay();
  }

  clear() {
    if (!this.previousOperandTextElement && !this.currentOperandTextElement)
      return;
    this.previousOperand = "";
    this.currentOperand = "";
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

numbers.forEach((button) => {
  button.addEventListener("click", (e) => {
    const number = e.target.innerText
    calculator.append(number)
  });
});
