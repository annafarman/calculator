const pastelColors = [
    '#FFB6C1', // LightPink
    '#FFC0CB', // Pink
    '#FFD700', // Gold
    '#FF69B4', // HotPink
    '#FFE4B5', // Moccasin
    '#FFA07A', // LightSalmon
    '#20B2AA', // LightSeaGreen
    '#87CEFA', // LightSkyBlue
    '#778899', // LightSlateGray
    '#B0C4DE'  // LightSteelBlue
];

const allButtons = document.querySelectorAll('button');

function assignRandomPastelColor() {

    allButtons.forEach(button => {
        // Generate a random index to select a color from the pastelColors array
        const randomIndex = Math.floor(Math.random() * pastelColors.length);
        // Assign the random pastel color as the background color of the button
        button.style.backgroundColor = pastelColors[randomIndex];
    });
}

// Call the function to assign random pastel colors when the page loads
window.onload = assignRandomPastelColor;


let firstNumber = undefined;
let secondNumber = undefined;
let resultNumber = 0;
let numberContainer = "";
let prevOperator = undefined;

let prevClickIsNumber = false;
let isNumber = false;
let firstClick = true;
let isDot = false;

const resultValue = document.querySelector('#results');
const displayText = document.querySelector('#input-text');

const updateDisplayText = (value) => {
    displayText.innerHTML += value;
}

const updateResultText = (value) => {
    resultValue.innerText = value;
}

const add = () => firstNumber + secondNumber;
const substract = () => firstNumber - secondNumber;
const multiply = () => firstNumber * secondNumber;
const divide = () => firstNumber / secondNumber;

const allClear = () => {
    firstNumber = undefined;
    secondNumber = undefined;
    prevOperator = undefined;
    resultNumber = 0;
    numberContainer = "";
    prevClickIsNumber = true;
    isNumber = true;
    firstClick = true;
    resultValue.innerText = "0";
    displayText.innerText = "";
};

const backSpace = () => {
    if (!prevClickIsNumber) return;
    if (numberContainer.length > 1) {
        numberContainer = numberContainer.slice(0,-1); //remove the last string
        console.log(numberContainer);
        displayText.innerText = displayText.innerText.slice(0,-1);//remove the last string
        updateResultText(numberContainer);
    } else if (numberContainer.length === 1) {
        numberContainer = ""; 
        displayText.innerText = displayText.innerText.slice(0,-1);//remove the last string
        updateResultText(0);
    }
};

const calculate = () => { }

const operate = (operation) => {
    switch (operation) {
        case "+":
            return add();
            break;
        case "minus":
            return substract();
            break;
        case "x":
            return multiply();
            break;
        default:
            return divide();
            break;
    }
};

allButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.value === "clear") allClear();

        if (/^[\d+=.x]$/.test(button.value)
            || button.value === "minus"
            || button.value === "divide") {
            checkNumber(button);
            checkOperation(button);
        }

        if (button.value === "backspace") {
            backSpace();
        }
    });
});

const checkNumber = (button) => {
    isNumber = button.classList.contains('number');
    // console.log(`isNumber: ${isNumber}`);
}

const checkOperation = (button) => {
    console.clear();
    if ((/^[+=x]$/.test(button.value) || button.value === "minus" || button.value === "divide") && (firstClick)) return; //exit when first click is not a number
    else firstClick = false;

    if (!isNumber && !prevClickIsNumber && prevOperator !== "=") return;
    if(numberContainer.includes('.') && button.value === ".") return;

    if (button.value === "minus") updateDisplayText("-");
    else if (button.value === "divide") updateDisplayText("&divide;");
    else if (!(/^[\d.=]$/.test(button.value))) updateDisplayText(button.value);

    if(prevOperator === '=' && isNumber) {
        firstNumber = undefined;
        secondNumber = undefined;
        prevOperator = undefined;
        resultNumber = 0;
        displayText.innerText = "";
        numberContainer += button.value;
        updateResultText(numberContainer); 
        updateDisplayText(button.value);
        console.log(`Number Container: ${numberContainer}`);
        prevClickIsNumber = isNumber;
        console.log(`Previous click is Number: ${prevClickIsNumber}`);

    } else if (prevOperator === '=' && !isNumber && button.value !== "=") {
        if (button.value === "minus") displayText.innerText = `${firstNumber}-`;
        else if (button.value === "divide") displayText.innerHTML = `${firstNumber}&divide;`;
        else displayText.innerText = `${firstNumber}${button.value}`;
        prevOperator = button.value;

    } else if (isNumber && (firstNumber === undefined || prevClickIsNumber)) { //very first number entered; after AC, OR number after another number
        numberContainer += button.value;
        updateResultText(numberContainer); 
        updateDisplayText(button.value);
        console.log(`Number Container: ${numberContainer}`);
        prevClickIsNumber = isNumber;
        console.log(`Previous click is Number: ${prevClickIsNumber}`);

    } else if (prevClickIsNumber && !isNumber) { //if pressing operator after a number

        if (button.value === "=" && (!prevOperator || prevOperator === "=")) return;

        prevClickIsNumber = isNumber; 
        console.log(`Previous click is Number: ${prevClickIsNumber}`);

        if (!firstNumber) {         //if first number hasnt assigned yet
            firstNumber = Number(numberContainer);
            numberContainer = "";
            prevOperator = button.value;
            console.log(`First Number: ${firstNumber} ${typeof firstNumber}`);
        } else {            //pressing operator after a number for a second value
            secondNumber = Number(numberContainer);
            numberContainer = '';
            resultNumber = operate(prevOperator);
            updateResultText(resultNumber);
            firstNumber = resultNumber;
            prevOperator = button.value;
            console.log(`Previous Operator: ${prevOperator}`);

            if (button.value === "=") {      //if operator is = 
                updateDisplayText("=");
                secondNumber = undefined;
                resultNumber = 0;
                console.log(`First Number: ${firstNumber} ${typeof firstNumber}`);
                console.log(`Second Number: ${secondNumber} ${typeof firstNumber}`);
                console.log(`Number Container: ${numberContainer}`);
                console.log(`Result: ${resultNumber}`);
                console.log(`Previous Operator: ${prevOperator}`);
            }
        }

    } else if (!prevClickIsNumber && isNumber && firstNumber) { //pressing a number after an operator

        if (prevOperator === "divide" && button.value === "0") {
            alert("Trying to divide by zero? Sorry, even the best calculators can't divide by nothing. Try a different number and save the universe from a math meltdown!");
            return;
        }
        prevClickIsNumber = isNumber;
        numberContainer += button.value;
        secondNumber = Number(numberContainer);
        updateResultText(button.value);
        updateDisplayText(button.value);
        console.log(`First Number: ${firstNumber}`);
        console.log(`Second Number: ${secondNumber}`);

    } else if (!prevClickIsNumber && !isNumber) { //pressing an operator after an operator
        if ((button.value === "=")) return;
        if (prevOperator === "=") {
            prevOperator = undefined;
            displayText.innerText = '';
            updateDisplayText(`${firstNumber}${button.value}`);
            console.log(`First Number: ${firstNumber} ${typeof firstNumber}`);
            console.log(`Second Number: ${secondNumber} ${typeof firstNumber}`);
            console.log(`Number Container: ${numberContainer}`);
            console.log(`Result: ${resultNumber}`);

        }
    }
}





