
// import {add, subtract, multiply, divide, modulo} from './math.js'

import {operate} from './operate.js';
import {genFrontEnd} from './frontend.js';
import {eventManager} from './eventManagement.js';

// Generate front end
genFrontEnd();

// Listen to events

window.addEventListener('click', e => eventManager(e));
window.addEventListener('touchstart', e => eventManager(e));
window.addEventListener('keydown', e => eventManager(e));

