const buttons = document.querySelectorAll("button");
const calculationElement = document.querySelector(".calculation-info")
const calculationOutput = document.querySelector(".calculation-answer");

const unaddableButtons = ["AC", "C", "="];

let shiftKeyDown = false;

function resetCalcCheck() {
    if (calculationOutput.innerHTML == "Syntax Error" || calculationOutput.innerHTML != "" ) { // Resets when an answer has been already entered when clicked AC or C
        console.log("Cleared");
        calculationElement.innerHTML = calculationElement.innerHTML.replace(calculationElement.innerHTML, "");
        calculationOutput.innerHTML = calculationOutput.innerHTML.replace(calculationOutput.innerHTML, "");
    }
}

function evaluate(str) {
    let newStr = str;

    try {
        if (newStr.search("x")) {
            newStr = newStr.replace("x", "*");
        }
        for (let i = 0; i < newStr.length; i++) {
            if (newStr.charCodeAt(i) == 247) {
                let firstPart = newStr.substr(0, i);
                let lastPart = newStr.substr(i + 1);
                
                let replaceChar = "/";

                newStr = firstPart + replaceChar + lastPart;         
            }
        }
        calculationOutput.innerHTML = Function("return " + newStr)();
    } catch (errorMessage) {
        console.log(errorMessage);
        calculationOutput.innerHTML = "Syntax Error";
    }
}

// Keycode handler
document.addEventListener("keydown", (event) => {
    if (event.code == "ShiftLeft") { shiftKeyDown = true; }
    // Calculation Key
    if (event.code == "Equal" && shiftKeyDown == false || event.code == "Enter") {  
        if (calculationElement.innerHTML.length != 0) {
            console.log("eval");
            console.log("Evaluate: " + calculationElement.innerHTML); 
            evaluate(calculationElement.innerHTML); 
        }
    }
    // Calculation functions
    if (event.code == "Backspace" && calculationElement.innerHTML.length != 0 && calculationOutput.innerHTML.length <= 0) {
        console.log("Cleared");
        calculationElement.innerHTML = calculationElement.innerHTML.substring(0, calculationElement.innerHTML.length - 1);
    } else if (event.code == "Backspace" && calculationOutput.innerHTML.length > 0) {
        resetCalcCheck();
    }
    //
    
    if (calculationElement.innerHTML.length < 25) {
        // SYMBOLS
        if (event.code == "Equal" && shiftKeyDown == true) { calculationElement.innerHTML += "+"; }// Adds + symbol to calculation
        if (event.code == "Digit5" && shiftKeyDown == true) {  resetCalcCheck(); calculationElement.innerHTML += "%"; }// Adds % symbol to calculation
        if (event.code == "Minus") {  resetCalcCheck(); calculationElement.innerHTML += "-"; }// Adds - symbol to calculation
        if (event.code == "KeyX") { resetCalcCheck(); calculationElement.innerHTML += "x"; }
        //

        
    
        // Adding Digits
        if (event.code.search("Digit") == 0 && shiftKeyDown == false) {resetCalcCheck(); calculationElement.innerHTML += event.code.slice(-1); }
        //
    }

})

document.addEventListener("keyup", (event) => {
    if (event.code == "ShiftLeft") { shiftKeyDown = false; }
})

// Loops through all buttons in the calculator
buttons.forEach((element) => {
    // Allows buttons to be clicked
    element.addEventListener("mouseup", (event) => {

        if (element.innerHTML == "=" && calculationElement.innerHTML.length != 0) { // Checks it is the = button that has been clicked
            evaluate(calculationElement.innerHTML); // Returns the answer of the calculation
            console.log(calculationOutput.innerHTML);
        } else if (element.innerHTML == "C" && calculationElement.innerHTML.length != 0) { // Checks it is the C button that has been clicked
            //if (calculationOutput.innerHTML.length != 0 || calculationOutput.innerHTML == "Syntax Error") { resetCalcCheck(); }
            console.log("Halo");
            if (calculationElement.innerHTML.length > 0 && calculationOutput.innerHTML.length == 0) { console.log("Cleared"); calculationElement.innerHTML = calculationElement.innerHTML.substring(0, calculationElement.innerHTML.length - 1); }
        } else if (element.innerHTML == "AC" && calculationElement.innerHTML.length != 0) { // Checks it is the AC button that has been clicked
            console.log(element.innerHTML);
            console.log("hola");
            calculationElement.innerHTML = "";
            calculationOutput.innerHTML = "";
        } else if (element.innerHTML != "C" && element.innerHTML != "AC" && element.innerHTML != "=") { 
            if (calculationOutput.innerHTML == "Syntax Error" || calculationOutput.innerHTML != "" ) { // Resets when an answer has been already entered when clicked AC or C
                calculationElement.innerHTML = "";
                calculationOutput.innerHTML = "";
            };
            console.log("hello");
            console.log(element.innerHTML);
            // Adds number or symbol to calculation
            calculationElement.innerHTML += element.innerHTML;
        }
    })
})

calculationOutput.addEventListener("change", function() {
    console.log("changed");
})