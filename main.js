let lhs;
let rhs;
let result;
let clickedOp;
let operand;
let prevResult = '';

//Regex for whole number operations
const reg1 = /^\-?\d+$/;
const reg2 = /^\-?\d+(\+|\-|\/|\*)$/;
const regComplete = /^(\-?\d+)(\+|\-|\/|\*)(\d+)$/; //string thatt matches a complete operation

//Regex for float operations
const freg1 = /^\-?\d+\.?\d+$/;
const freg2 = /^\-?\d+\.?\d+(\+|\-|\/|\*)$/;
const fregTrailingPoint = /^(\-?\d+\.?\d+)(\+|\-|\/|\*)(\d+\.?)$/
const fregComplete = /^(\-?\d+\.?\d*)(\+|\-|\/|\*)(\d+\.?\d*)$/;

let currentEntry = document.querySelector('.container .calculator .display .currentEntry');
let prevRes = document.querySelector('.container .calculator .display .prevResult');

const operationsObj = {
    '+': function(a, b) {return a + b},
    '-': function(a, b) {return a -  b},
    '*': function(a, b) {return a * b},
    '/': function(a, b) {
        if (b === 0) {
            console.log('b is 0');
            return 'Can\'t divide by 0';
        }
        else return a / b;
    }
}

const btns = document.querySelectorAll('.container .calculator .buttons .number');
const clearAll = document.querySelector('.container .calculator .buttons .clearButtons .ca');
const clearEntry = document.querySelector('.container .calculator .buttons .clearButtons .ce');
const op = document.querySelectorAll('.container .calculator .buttons .operation');
const point = document.querySelector('.container .calculator .buttons .point');
const eq = document.querySelector('.container .calculator .buttons .equal');

point.addEventListener('click', (e) => {
    if (currentEntry.innerText.length === 0 || Object.keys(operationsObj).includes(currentEntry.innerText[currentEntry.innerText.length - 1])) {
        currentEntry.innerText += 0 + '.'
    }
    else if(reg1.test(currentEntry.innerText)) currentEntry.innerText += '.';
    else if(regComplete.test(currentEntry.innerText) || fregTrailingPoint.test(currentEntry.innerText)) currentEntry.innerText += '.';
})


clearAll.addEventListener('click', () => {
    currentEntry.innerText = '';
    prevRes.innerText = '';
});
clearEntry.addEventListener('click', () => {
    if (currentEntry.innerText.length > 0) {
        let text = [...currentEntry.innerText];
        text.splice(text.length - 1, 1);
        currentEntry.innerText = text.join('');
    }
});
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', (e) => {
        currentEntry.innerText += e.target.value;
    })
}
for (let i = 0; i < op.length; i++) {
    op[i].addEventListener('click', (e) => {
        if(e.target.value == '-') {
            if (currentEntry.innerText.length === 0) currentEntry.innerText = e.target.value;
        }
        if (reg1.test(currentEntry.innerText) || freg1.test(currentEntry.innerText)) currentEntry.innerText += e.target.value;
        if (reg2.test(currentEntry.innerText)) {
            let text = [...currentEntry.innerText];
            text.splice(text.length - 1, 1);
            text.push(e.target.value);
            currentEntry.innerText = text.join('');
        }
        if (regComplete.test(currentEntry.innerText) || fregComplete.test(currentEntry.innerText)) {
            prevResult = currentEntry.innerText;
            clickedOp = e.target.value;
            if (regComplete.test(currentEntry.innerText)) result = getResult(currentEntry.innerText, regComplete);
            else result = getResult(currentEntry.innerText, fregComplete);
            prevRes.innerText = prevResult;
            currentEntry.innerText = result;
            currentEntry.innerText += e.target.value;
        }
    })
}
function getResult(str, regex) {
    const matches = [...str.match(regex)];
    if (matches[1].split('').includes('.'))  {
        lhs = parseFloat(matches[1])
        console.log(lhs);
    }
    else lhs = parseInt(matches[1]);
    operand = matches[2];
    if (matches[3].split('').includes('.'))  {
        rhs = parseFloat(matches[3])
        console.log(rhs)
    }
    else rhs = parseInt(matches[3]);
    return Math.round(operationsObj[operand](lhs, rhs) * 10000) / 10000; //handles 0.1 + 0.2 due to floating point arithmetic
}