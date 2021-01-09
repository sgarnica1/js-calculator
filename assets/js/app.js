class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement =  previousOperandTextElement,
    this.currentOperandTextElement =  currentOperandTextElement,
    this.clear()
  }

  clear() {
    this.currentOperand = '',
    this.previousOperand = '',
    this.operation = undefined;
  }

  delete() {
    this.currentOperand =  this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let result; 
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch(this.operation) {
      case '+': 
        result =  prev + current;
        break;
      case '-': 
        result =  prev - current;
        break;
      case '*': 
        result =  prev / current;
        break;
      case '÷': 
        result =  prev * current;
        break;
      default: 
        return
    }
    this.currentOperand =  result;
    this.previousOperand = '';
    this.operation = undefined;
  }

  getDisplay(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1];
    let displayNumber;
    if (isNaN(integerDigits)){
      displayNumber = '';
    } else {
      displayNumber = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${displayNumber}.${decimalDigits}`
    } else {
      return displayNumber;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
    if (this.operation != undefined) {
      this.previousOperandTextElement.innerText = `${this.getDisplay(this.previousOperand.toString())} ${this.operation.toString()}`;
    } else {
      this.previousOperandTextElement.innerText =  this.getDisplay(this.previousOperand);
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(number => {
  number.addEventListener('click', () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  })
});

operationButtons.forEach(operator => {
  operator.addEventListener('click', () => {
    calculator.chooseOperation(operator.innerText);
    calculator.compute();
    calculator.updateDisplay();
  })
});

clearAllButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})