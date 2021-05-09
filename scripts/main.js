
import {generateFrontEnd} from './generateFrontEnd.js';
import {calculator} from './calculator.js';

// Generate front end
generateFrontEnd();

// Listen and calculate

let userAgent = window.navigator.userAgent;

if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {

    window.addEventListener('touchstart', e => calculator(e));

} else {

    window.addEventListener('click', e => calculator(e));
    window.addEventListener('keydown', e => calculator(e));

}





