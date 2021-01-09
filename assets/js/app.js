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
        result =  prev * current;
        break;
      case '÷': 
        result =  prev / current;
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


let keys = {
  ZERO: 96,
  ONE: 97,
  TWO: 98,
  THREE: 99,
  FOUR: 100,
  FIVE: 101,
  SIX: 102,
  SEVEN: 103,
  EIGHT: 104,
  NINE: 105,
  POINT: 110,
  ENTER: 13,
  ADD: 107,
  SUBTRACT: 109,
  MULTIPLY: 106,
  DIVIDE: 111,
  DELETE: 8
};

document.addEventListener('keyup', evento => {

  function appendKeyNumber() {
    calculator.appendNumber(evento.key);
    calculator.updateDisplay();
  }

  function keyOperator() {
    calculator.chooseOperation(evento.key);
    calculator.compute();
    calculator.updateDisplay();
  }

  function enter() {
    calculator.compute();
    calculator.updateDisplay();
  }

  switch(evento.keyCode) {
    case keys.ZERO: 
      appendKeyNumber();
      break;
    case keys.ONE: 
      appendKeyNumber();
      break;
    case keys.TWO: 
      appendKeyNumber();
      break;
    case keys.THREE: 
      appendKeyNumber();
      break;
    case keys.FOUR: 
      appendKeyNumber();
      break;
    case keys.FIVE: 
      appendKeyNumber();
      break;
    case keys.SIX: 
      appendKeyNumber();
      break;
    case keys.SEVEN: 
      appendKeyNumber();
      break;
    case keys.EIGHT: 
      appendKeyNumber();
      break;
    case keys.NINE: 
      appendKeyNumber();
      break;
    case keys.POINT: 
      appendKeyNumber();
      break;
    case keys.ENTER: 
      enter();
      break;
    case keys.DELETE: 
      calculator.delete();
      calculator.updateDisplay();
      break;
    case keys.ADD: 
      keyOperator();
      break;
    case keys.SUBTRACT: 
      keyOperator();
      break;
    case keys.MULTIPLY: 
      keyOperator();
      break;
    case keys.DIVIDE: 
      calculator.chooseOperation('÷');
      calculator.compute();
      calculator.updateDisplay();
      break;
    default:
      return
  }
})