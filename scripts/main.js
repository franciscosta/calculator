
import {generateFrontEnd} from './generateFrontEnd.js';
import {calculator} from './calculator.js';

// Generate front end
generateFrontEnd();

// Listen and calculate

window.addEventListener('click', e => calculator(e));
window.addEventListener('keydown', e => calculator(e));

// window.addEventListener('touchstart', e => calculator(e));
