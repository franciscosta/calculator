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
    if (calc[number] === "0") {
        calc[number] = "";
    }

    calc[`${number}Started`] = true;

    // If its a number, append
    if (isInt(event)) calc[number] += event;

}

function addDot(event, number) {

    // Dot Management
    if (!calc[`${number}Dot`]) {

        if (calc[number] == "") calc[number] = "0" + event;

        calc[number] += event;
        calc[`${number}Dot`] = true;
    }

}

function setOperator(event) {

    // Update button
    calc.operator = event;
    calc.operatorStarted = true;

    updateOperatorInFrontEnd(event);


}

function result() {

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

    if (event == 'c') {
        reset();
    }

    // 1. First Number Operator
    if (!calc.secondStarted && !calc.operatorStarted) {

        // If continuous is on but nothing else is, reset
        if (calc.continuous && !calc.operatorStarted && !calc.secondStarted && calc.firstStarted) {
            if (isInt(event) || isDot(event)) {
                calc.first = '0';
                calc.continuous = false;
            } else {
                setOperator(event);
            }
            
        }


        if (isInt(event)) {
            updateNumbers(event, 'first');
        } else if (isDot(event)) {
            addDot(event, 'first');
        } else if (isPlusMinus(event)) {

            if (calc.continuous) {
                reset();
                calc.first = '';
            }

            if (calc.first[0] == '-') {
                calc.first = calc.first.substring(1);
            } else {
                calc.first = '-' + calc.first;
            }
        }

        updateScreenInFrontEnd('first');

    }


    // 2. Operator Magic
    operatorList.forEach(operator => {
        if (event == operator && !calc.secondStarted && !calc.continuous) {
            setOperator(event);
        } else if (event == operator && calc.secondStarted && !calc.continuous) {
            result();
            setOperator(event);
        } else if (event == operator && calc.secondStarted && calc.continuous) {
            result();
            setOperator(event);
        }
    });

    

    // 3. Second Number
    if (calc.firstStarted && calc.operatorStarted) {

        if (isInt(event)) {
            updateNumbers(event, 'second');
        } else if (isDot(event)) {
            addDot(event, 'second');
        } else if (isPlusMinus(event)) {
            if (calc.second[0] == '-') {
                calc.second = calc.second.substring(1);
            } else {
                calc.second = '-' + calc.second;
            }
        }

        updateScreenInFrontEnd('second');

    }

    // 4. Equals
    if (isEcqual(event) || event == 'enter') {
        result();
    }



}





