import {operate} from './operate.js';
import {eventManager} from './eventManager.js';

let calc = {

    first: '0',
    firstStarted: false,
    firstDot: false,

    second: '',
    secondStarted: false,
    secondDot: false,

    operator: undefined,
    operatorStarted: false,

    continuous: false

}

const operatorList = ['+', '-', '*', '/', '%'];

const isInt = e => Number.isInteger(Number(e));

const isDot = e => e == '.';

const isEcqual = e => e == '=';

const isPlusMinus = e => e == '+-';


// Updating functions

function updateNumbers(event, number) {

    // If its at zero, reset
    if (calc[number] == "0") {
        calc[number] = "";
    } else if (calc[number] === '-0') {
        calc[number] = '-';
    }

    calc[number] += event;
    calc[`${number}Started`] = true;

    // If its a number, append
    if (isInt(event)) {
        calc[number] += event;
    }

}

function addDot(event, number) {

    calc[`${number}Started`] = true;

    // Dot Management
    if (!calc[`${number}Dot`]) {

        if (calc[number] == "") calc[number] = "0" + event;

        calc[number] += event;
        calc[`${number}Dot`] = true;
    }

}

function setOperator(event) {

    calc.firstStarted = true;

    // Update button
    calc.operator = event;
    calc.operatorStarted = true;

    updateOperatorInFrontEnd(event);

}

function plusMinus(number) {
    
    if (calc[number][0] == '-') {
        calc[number] = calc[number].substring(1);
    } else {
        calc[number] = '-' + calc[number];
    }

}

function result() {

    if (calc.first == '') {
        calc.first = '0';
    } else if (calc.second == '') {
        calc.second = '0';
    }

    calc.first = operate(calc.first, calc.second, calc.operator);
    calc.firstDot = true;
    calc.firstStarted = true;

    calc.second = "";
    calc.secondDot = false;
    calc.secondStarted = false;

    calc.operator = undefined;
    calc.operatorStarted = false;

    resetOperatorFrontEnd();
    
    calc.continuous = true;

    updateScreenInFrontEnd('first');

}

function reset() {

    calc.first = '0';
    calc.firstStarted = false;
    calc.firstDot = false;

    calc.second = '';
    calc.secondStarted = false;
    calc.secondDot = false;

    calc.operator = undefined;
    calc.operatorStarted = false;

    calc.continuous = false;

}


function resetOperatorFrontEnd() {

    // Update front-end
    document.querySelectorAll('.button').forEach(element => {
        element.classList.remove('operator-selected')
    });

}

function updateOperatorInFrontEnd(event) {

    resetOperatorFrontEnd();
    document.querySelector(`[data-key="${event}"]`).classList.add('operator-selected');

}

function updateScreenInFrontEnd(number) {
    let screen = document.querySelector('.number');

    screen.innerText = calc[number]

}



// Actual Calculator

export function calculator(e) {

    // Parse the event and get the data

    let event = eventManager(e);

    // If c 

    if (event == 'c') {
        reset();
    }

    // Handle continuous mode

    if (!calc.operatorStarted && !calc.secondStarted && calc.continuous) {

        if (isInt(event) || isDot(event)) {
            reset();
        }
        
    }



    // State 1: First number, first time

    if (!calc.operatorStarted && !calc.secondStarted) {

        if (isInt(event)) {
            updateNumbers(event, 'first');
        } else if (isDot(event)) {
            addDot(event, 'first');
        } else if (isPlusMinus(event)) {
            plusMinus('first');
        }

        updateScreenInFrontEnd('first');

    }


    // Stage 2: Operator Magic

    operatorList.forEach(operator => {

        if (event == operator) {

            if (!calc.secondStarted) { 
                setOperator(event);
            } else {
                result();
                setOperator(event);
            }

        }
    
    });


    // Stage 3: Second number, first time
    
    if (calc.firstStarted && calc.operatorStarted) {

        if (isInt(event)) {
            updateNumbers(event, 'second');
        } else if (isDot(event)) {
            addDot(event, 'second');
        } else if (isPlusMinus(event)) {
            plusMinus('second');
        }

        updateScreenInFrontEnd('second');

    }

    //   Stage 4: Equals
    if (isEcqual(event) || event == 'enter') {
        result();
    }

    console.log(calc.first, calc.operator, calc.second)

}





