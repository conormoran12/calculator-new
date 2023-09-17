const buttons = document.querySelectorAll("button");
const calculationElement = document.querySelector(".calculation-info")
const calculationOutput = document.querySelector(".calculation-answer");

const unaddableButtons = ["AC", "C", "="];

let shiftKeyDown = false;

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

buttons.forEach((element) => {
    element.addEventListener("click", (e) => {
        if (element.innerHTML == "AC" || calculationOutput.innerHTML == "Syntax Error") {
            calculationElement.innerHTML = "";
            calculationOutput.innerHTML = "";
            for (let i = 0; i < unaddableButtons.length; i++) {
                if (element.innerHTML == unaddableButtons[i]) {
                    return;
                }
            }
            calculationElement.innerHTML += element.innerHTML;
        } else if (element.innerHTML == "C") {
            calculationElement.innerHTML = calculationElement.innerHTML.slice(0, -1);
        } else if (element.innerHTML == "=") {
            evaluate(calculationElement.innerHTML);
        } else {
            if (calculationElement.innerHTML != "" && calculationOutput.innerHTML != "") {
                calculationElement.innerHTML = "";
                calculationOutput.innerHTML = "";
            }
            calculationElement.innerHTML += element.innerHTML;
        }
    })
})

document.addEventListener("keydown", (event) => {
    if (event.code == "ShiftLeft") { shiftKeyDown = true; }
    if (shiftKeyDown == true && event.code == "Equal" && calculationElement.innerHTML.length < 36) { calculationElement.innerHTML = calculationElement.innerHTML + "+"; return; }
    if (shiftKeyDown == true && event.code == "Digit9" && calculationElement.innerHTML.length < 36) { calculationElement.innerHTML = calculationElement.innerHTML + "("; return; }
    if (shiftKeyDown == true && event.code == "Digit0" && calculationElement.innerHTML.length < 36) { calculationElement.innerHTML = calculationElement.innerHTML + ")"; return; }
    if (event.code == "Slash" && calculationElement.innerHTML.length < 36) { calculationElement.innerHTML = calculationElement.innerHTML + "÷"; return; }
    if (event.code == "Minus" && calculationElement.innerHTML.length < 36) { calculationElement.innerHTML = calculationElement.innerHTML + "-"; return; }

    if (event.code == "Backspace" && calculationOutput.innerHTML == "") {
        calculationElement.innerHTML = calculationElement.innerHTML.slice(0, -1); 
    } else if (event.code == "Backspace" && calculationOutput.innerHTML != "") { 
        calculationOutput.innerHTML = ""; 
        calculationElement.innerHTML = "";
        return;
    }

    buttons.forEach((element) => {
        if (event.code == "Digit" + element.innerHTML && calculationElement.innerHTML.length < 36 || event.code == "Key" + element.innerHTML.toUpperCase() && calculationElement.innerHTML.length < 36 ) {
            if (calculationOutput.innerHTML != "") { calculationOutput.innerHTML = ""; calculationElement.innerHTML = ""; }
            if (element.innerHTML == "C" || element.innerHTML == "AC") { return; }
            calculationElement.innerHTML += element.innerHTML;
        } else if (event.code == "Equal" || event.code == "Enter") {
            if (shiftKeyDown == false) {
                evaluate(calculationElement.innerHTML);
            }
        }
    })
})

document.addEventListener("keyup", (event) => {
    if (event.code == "ShiftLeft") {
        shiftKeyDown = false;
    }
})