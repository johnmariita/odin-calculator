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
const freg2 = /^\-?\d+\.?(\+|\-|\/|\*)$/;
const fregComplete = /^(\-?\d+\.?)(\+|\-|\/|\*)(\d+\.?)$/;

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
const op = document.querySelectorAll('.container .calculator .buttons .operation')


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
})
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
        if (reg1.test(currentEntry.innerText)) currentEntry.innerText += e.target.value;
        if (reg2.test(currentEntry.innerText)) {
            let text = [...currentEntry.innerText];
            text.splice(text.length - 1, 1);
            text.push(e.target.value);
            currentEntry.innerText = text.join('');
        }
        if (regComplete.test(currentEntry.innerText)) {
            prevResult = currentEntry.innerText;
            clickedOp = e.target.value;
            result = getResult(currentEntry.innerText, regComplete);
            prevRes.innerText = prevResult;
            currentEntry.innerText = result;
            currentEntry.innerText += e.target.value;
        }
    })
}
function getResult(str, regex) {
    const matches = [...str.match(regex)];
    lhs = parseInt(matches[1]);
    operand = matches[2];
    rhs = parseInt(matches[3]);
    return operationsObj[operand](lhs, rhs); 
}