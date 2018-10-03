const operators = ['+','-','/','*','|','&','~','%'];
let operator_in = 0;
let buffer = "";
let EQUAL_FLAG = false;

const btn = document.getElementsByClassName("btn");
const display = document.getElementById("display");
const miniDisplay = document.getElementById("miniDisplay");

// Mini-Display is off by default
miniDisplay.style.display = "none";

for (let index = 0; index < btn.length; index++) {
  const element = btn[index];
  element.addEventListener("click", (event) => { 
    // Show mini-diplay when any button is pressed
    miniDisplay.style.display = "block";
    if (EQUAL_FLAG) {
      miniDisplay.innerHTML = "";
      display.innerHTML = "";
      miniDisplay.style.display = "none";
      EQUAL_FLAG = false;
    }
    checkValid(event.srcElement.innerHTML);
    buffer = display.innerHTML;
  },false)
}

let checkValid = (input) => {
  let validDigit = input.match(/[0-9A-F]/);
  if (validDigit) {
    manageOperends(input);    
  }else {
    manageOperator(input);
  }
}

let manageOperator = (input) => {
  const currentInput = display.innerHTML;
  const currentMiniInput = miniDisplay.innerHTML;
  let lastChar = currentInput[currentInput.length - 1];

  if (input === '=') {
    EQUAL_FLAG = true;
    operator_in = 0;
    if (buffer && buffer[0] != "-"){
      manageOperends();
      buffer = "";
    }
  }else  if (currentInput != '' && operators.indexOf(lastChar) == -1) {
    miniDisplay.innerHTML += input;
    display.innerHTML += input;
    operator_in++;
  }else if (currentInput === '' && (input === '-' || input === '~')) {
    miniDisplay.innerHTML += input;
    display.innerHTML += input;
  }else if (currentInput != '' && input === '~' && lastChar != '~' && operators.indexOf(lastChar) > -1) {
    miniDisplay.innerHTML += input;
    display.innerHTML += input;
    operator_in++;
  }else if (operators.indexOf(input) > -1 && (currentInput.length > 1 || lastChar === '~' || lastChar === '-')) {
    miniDisplay.innerHTML += currentMiniInput.replace(/.$/,input);
    display.innerHTML += currentInput.replace(/.$/,input);
  }
  if (operator_in >= 2) {
    if (input != "~") {
      manageOperends();
      display.innerHTML += input;
      operator_in++;        
    }
  }
}

let manageOperends = (input) => {
  let currentInput = display.innerHTML;
  let lastChar = currentInput[currentInput.length - 1];
  let eval = "";

  if (input === "AC") {
    miniDisplay.innerHTML = '';
    display.innerHTML = '';
    operator_in = 0;
  } else if ( (operator_in >= 2 && operators.indexOf(lastChar) > -1 && lastChar != "~") || (EQUAL_FLAG)){

    let regexSearch = currentInput.search(/\+|\-|\/|\*|\||\&|\~|\%/);
    let oper_1 = currentInput.substr(0,regexSearch);   
    let oper = currentInput[regexSearch];
    let oper_2 = currentInput.substr(regexSearch+1,currentInput.length);
    console.log(oper_1 + " -- " + oper + " -- " + oper_2);

    if (currentInput.indexOf('~') > -1) {
      regexSearch = currentInput.search("~");
      let temp = currentInput.substring(regexSearch+1, currentInput.length - 1);      
      oper_2 = calculate(parseInt(temp, 16), "~");
           
      eval = calculate(parseInt(oper_1, 16),oper,parseInt(oper_2, 16));
      display.innerHTML = eval;
      operator_in = 0;
    }else {
      console.log(oper_1 + " -- " + oper + " -- " + oper_2);
      eval = calculate(parseInt(oper_1, 16),oper,parseInt(oper_2, 16));
      display.innerHTML = eval;
      operator_in = 0;
    }    
  }else {
    if (input) {
      miniDisplay.innerHTML += input;
      display.innerHTML += input; 
    }
  }
}

let calculate =  (oper_1, oper, oper_2) => {
  console.log(oper_1 + " -- " + oper + " -- " + oper_2);
  let finalVal = "";
  switch (oper) {
    case "+":
      finalVal = (oper_1 + oper_2);
      break;
    case "-":
      finalVal = (oper_1 - oper_2);
      break;
    case "*":
      finalVal = (oper_1 * oper_2);
      break;
    case "/":
      finalVal = (oper_1 / oper_2);
      break;
    case "%":
      finalVal = (oper_1 % oper_2);
      break;
    case "|":
      finalVal = (oper_1 | oper_2);
      break;
    case "&":
      finalVal = (oper_1 & oper_2);
      break;
    case "~":
      finalVal = (~oper_1);
      break;
    default:
      break;
  }
  finalVal = finalVal.toString(16).toUpperCase();
  console.log(finalVal);
  
  return finalVal;
}

// let oper_1 = "44";
// // let oper_2 = "10";
// let oper = "~";
 
// console.log(calculate(parseInt(oper_1,16),oper));